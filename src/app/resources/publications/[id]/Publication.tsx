"use client";
import React, { useEffect, useState } from "react";
import { FileText, Share2, Eye } from "lucide-react";
import { BiSolidLike } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import PublicationsLayout from "@/components/layouts/Publications";
import Breadcrumbs from "@/components/common/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useCommentOnPublicationMutation, useDownloadPublicationMutation, useFollowUserMutation, useGetCommentsQuery, useGetPublicationByIdQuery, useGetPublicationsQuery, useLikeAndUnlikeCommentMutation, useLikeOrUnlikePublicationMutation, useRecordPublicationViewMutation, useSharePublicationMutation, useUnfollowUserMutation } from "@/store/features/publications/actions";

import { useGetPublisherProfileByIdQuery, useGetUserInterestsQuery } from "@/store/features/auth/actions";

import { useGetSuggestedConnectionsQuery } from "@/store/features/general/actions";
import { useGetOpportunitiesQuery } from "@/store/features/opportunities/actions";
import { selectCurrentUser } from "@/store/features/auth/selectors";

import { RootState } from "@/store";
import { Profile, Publication } from "@/components/types/profile";
import PublicationCardSkeleton from "@/components/common/PublicationCardSkeleton";
import { PublicationCard } from "@/components/blocks/PublicationCard";
import PublisherProfileCard from "@/components/common/PublishersProfileCard";
import ResearchInterestsCard from "@/components/common/ResearchInterestCard";
import SuggestedConnectionsCard from "@/components/common/SuggestionConnectionsCard";
import { EventAndOpportunityCard } from "@/components/blocks/EventsAndOpportunityCard";
import { forceDownloadPdf, mapTagsToPublicationColors } from "@/helpers/helpers";

import DocPlaceholder from "@/assets/doc_placeholder.png";
import PageLoader from "@/components/common/PageLoader";
import PublicationShareModal from "@/components/common/PublicationShareModal";
import { CommentsSection } from "@/components/blocks/Comments";

/* ============================= TYPES ============================= */
interface CommentFilters {
  page: number;
  page_size: number;
}

interface Author {
  id: string;
  first_name: string;
  last_name: string;
  user?: string;
}

interface Sector {
  id: string;
  name: string;
}

/* ============================= CUSTOM HOOKS ============================= */
const usePublicationData = (id: string | string[] | undefined) => {
  const { data, isLoading, refetch } = useGetPublicationByIdQuery(id);
  const { data: interests, isLoading: interestLoading } = useGetUserInterestsQuery({});
  const { data: connectionSuggestions } = useGetSuggestedConnectionsQuery({});
  const { data: opportunities, isLoading: loadingOpportunity } = useGetOpportunitiesQuery({});
  const { 
    data: recommendedPublications, 
    isLoading: recLoading, 
    isError: recError 
  } = useGetPublicationsQuery({});

  return {
    publication: data,
    interests,
    connectionSuggestions,
    opportunities,
    recommendedPublications,
    isLoading: isLoading || interestLoading || loadingOpportunity || recLoading,
    recError,
    refetchPublication: refetch,
  };
};

const usePublicationInteractions = (
  publicationId: string | undefined,
  refetchPublication: () => void
) => {
  const [likeOrUnlikePublication, { isLoading: likeLoading }] = 
    useLikeOrUnlikePublicationMutation();
  const [sharePublication] = useSharePublicationMutation();
  const [downloadPublication] = useDownloadPublicationMutation();

  const handleLikeToggle = async (isLiked: boolean) => {
    if (!publicationId) return;
    const action = isLiked ? "unlike" : "like";
    try {
      await likeOrUnlikePublication({ id: publicationId, action }).unwrap();
      refetchPublication();
    } catch (err) {
      console.error("Failed to toggle like:", err);
      toast.error("Failed to update like status");
    }
  };

  const handleDownload = async (document?: string, title?: string) => {
    if (!publicationId || !document) return;

    try {
      await downloadPublication(publicationId).unwrap();
      forceDownloadPdf(document, title ? `${title}.pdf` : "publication.pdf");
      refetchPublication();
    } catch (err) {
      console.error("Failed to track download:", err);
      forceDownloadPdf(document, title ? `${title}.pdf` : "publication.pdf");
    }
  };

  const handleShareTrack = async () => {
    if (!publicationId) return;
    try {
      await sharePublication(publicationId).unwrap();
      refetchPublication();
    } catch (err) {
      console.error("Failed to track share:", err);
    }
  };

  return {
    likeLoading,
    handleLikeToggle,
    handleDownload,
    handleShareTrack,
  };
};

const useFollowUser = (authorId?: string) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followUser, { isLoading: followLoading }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: unfollowLoading }] = useUnfollowUserMutation();

  const handleFollowToggle = async (currentlyFollowing: boolean) => {
    if (!authorId) return;

    console.log("Toggling follow for author ID:", authorId, "Currently following:", currentlyFollowing);

    try {
      if (currentlyFollowing) {
        await unfollowUser(authorId).unwrap();
        setIsFollowing(false);
        toast.success("Unfollowed successfully");
      } else {
        await followUser(authorId).unwrap();
        setIsFollowing(true);
        toast.success("Following successfully");
      }
    } catch (err) {
      console.error("Failed to toggle follow:", err);
      toast.error("Failed to update follow status");
    }
  };

  return {
    isFollowing,
    setIsFollowing,
    handleFollowToggle,
    loading: followLoading || unfollowLoading,
  };
};

const useComments = (id: string | string[] | undefined) => {
  const [run, setRun] = useState(false);
  const [commentFilters, setCommentFilters] = useState<CommentFilters>({
    page: 1,
    page_size: 10,
  });

  const { data: commentsData, isLoading, refetch } = useGetCommentsQuery(commentFilters);
  const [commentOnPublication] = useCommentOnPublicationMutation();
  const [likeOrUnlikeComment] = useLikeAndUnlikeCommentMutation();

  const publisher = useSelector((state: RootState) => state.auth.profile as Profile | null);

  const handleSubmitComment = async (commentText: string) => {
    if (!publisher) return;

    const data_to_send = {
      comment: commentText,
      object_pk: id,
      author: publisher.user,
      name: `${publisher.first_name} ${publisher.last_name}`,
      email: publisher.email,
      content_type: "niiricApp.publication",
      followup: true,
    };

    try {
      await commentOnPublication(data_to_send).unwrap();
      setRun(!run);
      toast.success("Comment Added");
    } catch (err) {
      console.error("Failed to add comment:", err);
      toast.error("Failed to add comment");
    }
  };

  const handleCommentLikeToggle = async (comment: any, action: string) => {
    try {
      const data_to_send = {
        comment: comment.id,
        flag: action,
      };
      await likeOrUnlikeComment(data_to_send).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  useEffect(() => {
    refetch();
  }, [run, refetch]);

  return {
    commentsData,
    commentFilters,
    run,
    setRun,
    handleSubmitComment,
    handleCommentLikeToggle,
    isLoading,
  };
};

const useViewTracking = (id: string | string[] | undefined, publicationId?: string) => {
  const [recordPublicationView] = useRecordPublicationViewMutation();

  useEffect(() => {
    const recordView = async () => {
      if (!id || !publicationId) return;

      const viewKey = `publication_view_${id}`;
      const hasViewed = sessionStorage.getItem(viewKey);

      if (!hasViewed) {
        try {
          await recordPublicationView(publicationId).unwrap();
          sessionStorage.setItem(viewKey, "true");
        } catch (err) {
          console.error("Failed to record publication view:", err);
        }
      }
    };

    if (publicationId) {
      recordView();
    }
  }, [id, publicationId, recordPublicationView]);
};

/* ============================= COMPONENTS ============================= */
interface AuthorListProps {
  label: string;
  authors?: Author[];
}

const AuthorList: React.FC<AuthorListProps> = ({ label, authors }) => {
  if (!authors || authors.length === 0) return null;

  return (
    <div className="flex items-center gap-2 mb-4 font-raleway">
      <span className="text-base text-gray-600">
        <span className="text-primary-green">{label}:</span>
      </span>
      <div className="flex flex-wrap gap-3 items-center">
        {authors.map((author, i) => (
          <div key={i} className="flex items-center gap-2">
            <Avatar className="size-7">
              <AvatarImage src="" />
              <AvatarFallback className="text-xs">
                {author.first_name?.[0] || ""}
                {author.last_name?.[0] || ""}
              </AvatarFallback>
            </Avatar>
            <h4 className="text-[#3F434A] text-base font-normal">
              {author.first_name} {author.last_name}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

interface PublicationActionsProps {
  onDownload: () => void;
  onShare: () => void;
  onLike: () => void;
  isLiked: boolean;
  likeCount: number;
  shareCount: number;
  likeLoading: boolean;
}

const PublicationActions: React.FC<PublicationActionsProps> = ({
  onDownload,
  onShare,
  onLike,
  isLiked,
  likeCount,
  shareCount,
  likeLoading,
}) => (
  <>
    <div className="flex items-center gap-6">
      <Button
        variant="ghost"
        disabled={likeLoading}
        onClick={onLike}
        className={`flex items-center gap-1 text-gray-500 bg-transparent group hover:bg-green-50 transition ${
          isLiked ? "bg-green-100 text-green-600" : ""
        }`}
      >
        <BiSolidLike
          className={`w-4 h-4 transition ${
            isLiked
              ? "text-green-600 group-hover:text-green-700"
              : "text-gray-400 group-hover:text-green-500"
          }`}
        />
        <span className="text-sm">{likeCount}</span>
      </Button>
      <div className="flex items-center gap-1 text-gray-500">
        <PiShareFat className="w-4 h-4" />
        <span className="text-sm">{shareCount}</span>
      </div>
    </div>

    <Separator className="border-primary-green mb-4" />

    <div className="flex gap-3 mb-4">
      <Button onClick={onDownload} variant="primary-green" className="px-6 py-2 w-[161px]">
        <FileText className="w-4 h-4" /> Download PDF
      </Button>
      <Button
        onClick={onShare}
        variant="outline"
        className="px-6 py-2 w-[161px] border-primary-green text-primary-green"
      >
        <Share2 className="w-4 h-4" /> Share
      </Button>
    </div>
  </>
);

interface RelatedPublicationsProps {
  publications?: Publication[];
  isLoading: boolean;
  isError: boolean;
  onNavigate: (id: string) => void;
}

const RelatedPublications: React.FC<RelatedPublicationsProps> = ({
  publications,
  isLoading,
  isError,
  onNavigate,
}) => {
  if (isLoading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, i) => (
          <PublicationCardSkeleton key={i} />
        ))}
      </>
    );
  }

  if (isError) return <p>Error loading publications.</p>;
  if (!publications?.length) return <p>No publications found.</p>;

  return (
    <>
      {publications.slice(0, 4).map((pub: Publication) => (
        <Card key={pub.id} className="shadow-none mb-4 gap-3 rounded-xl p-6">
          <PublicationCard
            image={DocPlaceholder}
            title={pub.title}
            abstract={pub.abstract}
            tags={mapTagsToPublicationColors(pub.publication_type ?? [])}
            onViewPaper={() => onNavigate(pub.id)}
            {...pub}
          />
        </Card>
      ))}
    </>
  );
};

/* ============================= MAIN COMPONENT ============================= */
const ResearchPublicationPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [showShareModal, setShowShareModal] = useState(false);
  const user = useSelector(selectCurrentUser);

  const {
    publication,
    opportunities,
    recommendedPublications,
    isLoading,
    recError,
    refetchPublication,
  } = usePublicationData(id);

  // Fix: Correctly destructure the query result
  const { 
    data: publisherProfile, 
    isLoading: publisherLoading, 
    refetch: refetchPublisher 
  } = useGetPublisherProfileByIdQuery(publication?.author, {
    skip: !publication?.author, // Skip query if no author_user_id
  });

  const { likeLoading, handleLikeToggle, handleDownload, handleShareTrack } =
    usePublicationInteractions(publication?.id, refetchPublication);

  const { isFollowing, handleFollowToggle, loading: followLoading } = 
    useFollowUser(publication?.author_user_id);


  const {
    commentsData,
    commentFilters,
    run,
    setRun,
    handleSubmitComment,
    handleCommentLikeToggle,
  } = useComments(id);

  useViewTracking(id, publication?.id);

  // Helpers
  const renderAuthors = (authors?: Author[]) => {
    if (!authors || authors.length === 0) return null;

    return authors.map((author, idx) => (
      <div key={idx} className="flex gap-3 items-center">
        <Avatar className="size-7">
          <AvatarImage src="" />
          <AvatarFallback className="text-xs">
            {author.first_name?.[0] || ""}
            {author.last_name?.[0] || ""}
          </AvatarFallback>
        </Avatar>
        <h4 className="font-normal text-base text-[#3F434A]">
          {author.first_name} {author.last_name}
        </h4>
      </div>
    ));
  };

  const renderSectors = (sectors?: Sector[]) =>
    sectors?.map((s) => s.name).join(", ") || "N/A";

  const renderPublicationTags = (types?: string[]) =>
    mapTagsToPublicationColors(types ?? []).map((tag, i) => (
      <Badge
        key={i}
        className={`${tag.colorClass} ${tag.textClass} text-base font-poppins font-normal rounded-full`}
      >
        {tag.label}
      </Badge>
    ));

  console.log('user', user);
  console.log('publisherProfile', publisherProfile);

  if (isLoading) {
    return <PageLoader message="Loading publication..." overlay size="lg" />;
  }

  if (!publication) {
    return (
      <PublicationsLayout>
        <div className="container mx-auto py-10">
          <p className="text-center text-gray-600">Publication not found.</p>
        </div>
      </PublicationsLayout>
    );
  }

  return (
    <PublicationsLayout>
      <div className="py-3 container mx-auto">
        <Breadcrumbs dynamicLabels={{ [id as string]: publication.title }} />
      </div>

      <div className="min-h-screen container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ---------- MAIN CONTENT ---------- */}
          <div className="lg:col-span-2 space-y-5">
            <Card className="shadow-none gap-3 border-0 rounded-xl p-6">
              <h1 className="text-xl font-bold capitalize text-black">
                {publication.title}
              </h1>

              <div className="flex items-center gap-4">
                <span className="text-base text-gray-500 font-raleway">
                  <span className="text-primary-green">Published</span> •{" "}
                  {publication.publication_date || "N/A"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {renderPublicationTags(publication.publication_type)}
                </div>
              </div>

              {publication.co_authors && publication.co_authors.length > 0 && (
                <div className="flex items-center gap-2 font-raleway">
                  <span className="text-base text-gray-600">
                    <span className="text-primary-green">Co-Author :</span>
                  </span>
                  {renderAuthors(publication.co_authors)}
                </div>
              )}

              <PublicationActions
                onDownload={() => handleDownload(publication.document, publication.title)}
                onShare={() => setShowShareModal(true)}
                onLike={() => handleLikeToggle(publication.is_liked ?? false)}
                isLiked={publication.is_liked ?? false}
                likeCount={publication.like_count ?? 0}
                shareCount={publication.share_count ?? 0}
                likeLoading={likeLoading}
              />

              <div className="flex items-center font-raleway gap-3 mb-4 text-base text-[#242424]">
                <div className="flex items-center gap-1">
                  <Eye className="size-5" />
                  <span>{publication.view_count || 0} views</span>
                </div>
              </div>

              <section>
                <h2 className="text-base font-medium text-gray-900 mb-3">Abstract</h2>
                <div
                  className="space-y-4 text-black text-base font-raleway font-normal leading-relaxed text-justify"
                  dangerouslySetInnerHTML={{ __html: publication.abstract ?? "" }}
                />
              </section>
            </Card>

            <Card className="shadow-none border-0 gap-0 rounded-xl p-6">
              <h2 className="text-lg font-medium text-primary-green mb-4">
                Other Information
              </h2>
              <div className="flex items-center gap-2 mb-4 font-raleway">
                <span className="text-base text-gray-600">
                  <span className="text-primary-green">Sector :</span>
                </span>
                <h4 className="font-normal capitalize text-base text-[#3F434A]">
                  {renderSectors(publication.sectors)}
                </h4>
              </div>

              {publication.collaborators && publication.collaborators.length > 0 && (
                <div className="flex items-center gap-2 mb-4 font-raleway">
                  <span className="text-base text-gray-600">
                    <span className="text-primary-green">Contributors :</span>
                  </span>
                  {renderAuthors(publication.collaborators)}
                </div>
              )}
            </Card>

            <Card className="shadow-none border-0 rounded-xl p-6">
              <h2 className="text-lg font-medium text-primary-green mb-4">
                Related Publications
              </h2>
              <RelatedPublications
                publications={recommendedPublications?.results}
                isLoading={false}
                isError={recError ?? false}
                onNavigate={(pubId) => router.push(`/dashboard/publications/${pubId}`)}
              />
            </Card>

            <CommentsSection
              onSubmitComment={handleSubmitComment}
              run={run}
              setRun={setRun}
              onLike={handleCommentLikeToggle}
              filters={commentFilters}
              currentUserId={user?.id}
              totalCount={commentsData?.length || 0}
              publication={publication}
              comments={commentsData}
            />
          </div>

          {/* ---------- SIDEBAR ---------- */}
          <div className="lg:col-span-1 space-y-5">
            <PublisherProfileCard
              publisher={{
                id: publication.id,
                full_name: publication.author_name || "Unknown Author",
                first_name: publication.first_name || "Unknown",
                image_url: publication.author_profile_pic,
                ...publisherProfile,
              }}
              user={user}
              showFollowButton
              isFollowing={isFollowing}
              onFollowToggle={handleFollowToggle}
              loading={followLoading}
            />

            <Card className="shadow-none border-0 rounded-xl p-6">
              <h3 className="font-medium text-base mb-3 text-primary-green">
                Opportunities
              </h3>
              {opportunities?.results?.slice(0, 3)?.map((event: any) => (
                <EventAndOpportunityCard
                  key={event.id}
                  title={event.title}
                  deadline={event.deadline}
                  description={event.description}
                  link={`/opportunities/${event.id}`}
                />
              ))}
            </Card>
          </div>
        </div>
      </div>

      <PublicationShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        publication={{
          title: publication.title ?? "",
          abstract: publication.abstract ?? "",
          tags: publication.publication_type ?? [],
          thumbnail: publication.thumbnail ?? "",
          publicationLink: publication.document ?? "",
          publication_type: publication.publication_type ?? [],
          id: publication.id ?? "",
        }}
        onShareTrack={handleShareTrack}
      />
    </PublicationsLayout>
  );
};

export default ResearchPublicationPage;
