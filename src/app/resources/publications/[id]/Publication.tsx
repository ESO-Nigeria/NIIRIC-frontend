"use client";
import React, { useEffect, useState } from "react";
import {
  FileText,
  Share2,
  Eye,
} from "lucide-react";
import { BiSolidLike } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import PublicationsLayout from "@/components/layouts/Publications";
import Breadcrumbs from "@/components/common/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useGetCommentsQuery, useGetPublicationByIdQuery, useGetPublicationsQuery, useLikeOrUnlikePublicationMutation } from "@/store/features/publications/actions";
import { useGetUserInterestsQuery } from "@/store/features/auth/actions";
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


// ---------- SMALL REUSABLE UI COMPONENTS ---------- //

const AuthorList = ({ label, authors }: { label: string; authors: any[] }) => (
  <div className="flex items-center gap-2 mb-4 font-raleway">
    <span className="text-base text-gray-600">
      <span className="text-primary-green">{label}:</span>
    </span>
    <div className="flex flex-wrap gap-3 items-center">
      {authors?.map((author, i) => (
        <div key={i} className="flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarImage src="" />
            <AvatarFallback className="text-xs">
              {author?.first_name?.[0]}{author?.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <h4 className="text-[#3F434A] text-base font-normal">
            {author?.first_name} {author?.last_name}
          </h4>
        </div>
      ))}
    </div>
  </div>
);

const InfoBlock = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-2 mb-4 font-raleway">
    <span className="text-base text-gray-600">
      <span className="text-primary-green">{label}:</span>
    </span>
    <h4 className="font-normal capitalize text-base text-[#3F434A]">{value}</h4>
  </div>
);



// ---------- MAIN COMPONENT ---------- //

const ResearchPublicationPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [showShareModal, setShowShareModal] = useState(false);
  const [run, setRun] = useState()
  const [commentFilters, setCommentFilters] = useState({
    page: 1,
    page_size: 10
  })
  // --- API CALLS ---
  const { data, isLoading, refetch: refetchPublication } = useGetPublicationByIdQuery(id);
  const { data: interests, isLoading: interestLoading } = useGetUserInterestsQuery({});
  const { data: connectionSuggestions, isLoading: connectionLoading } = useGetSuggestedConnectionsQuery({});
  const { data: opportunities, isLoading: loadingOpportnunity } = useGetOpportunitiesQuery({});
  const { data: recommendedPublications, isLoading: recLoading, isError: recError } = useGetPublicationsQuery({});
  const [likeOrUnlikePublication, { isLoading: likeLoading }] = useLikeOrUnlikePublicationMutation();
  const {data: commentsData, isLoading: loadingComments, refetch: refetchComments} = useGetCommentsQuery(commentFilters)
  // --- USER DATA ---
  const publisher = useSelector((state: RootState) => state.auth.profile as Profile | null);
  const user = useSelector(selectCurrentUser);

  const handleLikeToggle = async () => {
    const action = data?.is_liked ? "unlike" : "like";
    try {
      await likeOrUnlikePublication({ id: data.id, action }).unwrap();
      refetchPublication()
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };
   // Helpers
  const renderAuthors = (authors?: { first_name: string; last_name: string }[]) =>
    authors?.map((author, idx) => (
      <div key={idx} className="flex gap-3 items-center">
        <Avatar className="size-7">
          <AvatarImage src="" />
          <AvatarFallback className="text-xs">
            {author.first_name?.[0]}
            {author.last_name?.[0]}
          </AvatarFallback>
        </Avatar>
        <h4 className="font-normal text-base text-[#3F434A]">
          {author.first_name} {author.last_name}
        </h4>
      </div>
    ));

  useEffect(() => {
      refetchComments()
    },[run])

  const renderSectors = (sectors?: { name: string }[]) =>
    sectors?.map((s) => s.name).join(", ");

  const renderPublicationTags = (types?: string[]) =>
    mapTagsToPublicationColors(types ?? []).map((tag, i) => (
      <Badge
        key={i}
        className={`${tag.colorClass} ${tag.textClass} text-base font-poppins font-normal rounded-full`}
      >
        {tag.label}
      </Badge>
    ));

  const renderRelatedPublications = () => {
    if (recLoading)
      return Array.from({ length: 3 }).map((_, i) => <PublicationCardSkeleton key={i} />);
    if (recError) return <p>Error loading publications.</p>;
    if (!recommendedPublications?.results?.length) return <p>No publications found.</p>;

    return recommendedPublications.results.slice(0, 4).map((pub: Publication) => (
      <Card key={pub.id} className="shadow-none mb-4 gap-3 rounded-xl p-6">
        <PublicationCard
          image={DocPlaceholder}
          title={pub.title}
          abstract={pub.abstract}
          tags={mapTagsToPublicationColors(pub.publication_type ?? []) ?? null}
          onViewPaper={() => router.push(`/dashboard/publications/${pub.id}`)}
          
          {...pub}
        />
      </Card>
    ));
  };
  // if (isLoading && interestLoading && loadingOpportnunity && recLoading ) return <div className="text-center py-10">Loading publication...</div>;
      if (isLoading || interestLoading || loadingOpportnunity || recLoading) {
        return <PageLoader message="Loading publication..." overlay size="lg" />;
        // <Loader message="Loading publication..." overlay size="lg" />

      }

    console.log('data', data, commentsData)
  return (
    <PublicationsLayout>
      {/* Breadcrumbs */}
      <div className="py-3 container mx-auto">
        <Breadcrumbs dynamicLabels={{ [id as string]: data?.title }} />
      </div>

      <div className="min-h-screen container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ---------- MAIN CONTENT ---------- */}
          <div className="lg:col-span-2 space-y-5">
            
            {/* Publication Overview */}
            <Card className="shadow-none gap-3 border-0 rounded-xl p-6">
               <h1 className="text-xl font-bold capitalize text-black ">
                {data?.title}
              </h1>

              {/* Publication Info */}
              <div className="flex items-center gap-4 ">
                <span className="text-base text-gray-500 font-raleway">
                  <span className="text-primary-green">Published</span> •{" "}
                  {data?.publication_date}
                </span>
                <div className="flex flex-wrap gap-2">
                  {renderPublicationTags(data?.publication_type)}
                </div>
              </div>
             

              {/* Authors */}
              <div className="flex items-center gap-2 font-raleway">
                <span className="text-base text-gray-600">
                  <span className="text-primary-green ">Co-Author :</span>
                </span>
                {renderAuthors(data?.co_authors)}
              </div>

              {/* Stats */}
               <div className="flex items-center gap-6 ">
                {/* <Button variant="ghost" className="flex bg-transparent group items-center gap-1 text-gray-500">
                  <BiSolidLike className="w-4 h-4 hover:bg-primary-green" />
                  <span className="text-sm">{data?.like_count}</span>
                </Button> */}
                <Button
                  variant="ghost"
                  disabled={likeLoading}
                  onClick={handleLikeToggle}
                  className={`flex items-center gap-1 text-gray-500 bg-transparent group hover:bg-green-50 transition ${
                    data?.is_liked ? "bg-green-100 text-green-600" : ""
                  }`}
                >
                  <BiSolidLike
                    className={`w-4 h-4 transition ${
                      data?.is_liked
                        ? "text-green-600 group-hover:text-green-700"
                        : "text-gray-400 group-hover:text-green-500"
                    }`}
                  />
                  <span className="text-sm">{data?.like_count}</span>
                </Button>
                <div className="flex items-center gap-1 text-gray-500">
                  <PiShareFat className="w-4 h-4" />
                  <span className="text-sm">{data?.share_count}</span>
                </div>
              </div>
              {/* <div className="flex items-center gap-6 text-gray-500 mb-4">
                <div className="flex items-center gap-1"><BiSolidLike className="w-4 h-4" />{data?.like_count}</div>
                <div className="flex items-center gap-1"><PiShareFat className="w-4 h-4" />{data?.share_count}</div>
              </div> */}

              <Separator className="border-primary-green mb-4" />

              {/* Actions */}
              <div className="flex gap-3 mb-4">
                <Button onClick={() => forceDownloadPdf (data?.document ?? "", data?.title ? `${data?.title}.pdf` : "publication.pdf")} variant="primary-green" className="px-6 py-2 w-[161px]">
                  <FileText className="w-4 h-4" /> Download PDF
                </Button>
                <Button onClick={() => setShowShareModal(true)} variant="outline" className="px-6 py-2 w-[161px] border-primary-green text-primary-green">
                  <Share2 className="w-4 h-4" /> Share
                </Button>
              </div>

              {/* Views */}
               {/* <div className="flex items-center font-raleway gap-3 mb-4 text-base text-[#242424]">
                <div className="flex items-center gap-1">
                  <Eye className="size-5" />
                  <span>15 Views</span>
                </div>
              </div> */}

              {/* Abstract */}
              <section>
                <h2 className="text-base font-medium text-gray-900 mb-3">Abstract</h2>
               <div
                  className="space-y-4 text-black text-base font-raleway font-normal leading-relaxed text-justify"
                  dangerouslySetInnerHTML={{ __html: data?.abstract ?? "" }}
                />
              </section>
            </Card>

            {/* Other Information */}
            <Card className="shadow-none border-0 gap-0 rounded-xl p-6">
              <h2 className="text-lg font-medium text-primary-green mb-4">Other Information</h2>
              <div className="flex items-center gap-2 mb-4 font-raleway">
                <span className="text-base text-gray-600">
                  <span className="text-primary-green">Sector :</span>
                </span>
                <h4 className="font-normal capitalize text-base text-[#3F434A]">
                  {renderSectors(data?.sectors)}
                </h4>
              </div>

              <div className="flex items-center gap-2 mb-4 font-raleway">
                <span className="text-base text-gray-600">
                  <span className="text-primary-green">Contributors :</span>
                </span>
                {renderAuthors(data?.collaborators)}
              </div>
            </Card>

            {/* Related Publications */}
            <Card className="shadow-none border-0 rounded-xl p-6">
              <h2 className="text-lg font-medium text-primary-green mb-4">Related Publications</h2>
              {renderRelatedPublications()}
            </Card>
            <CommentsSection filters={commentFilters} setFilters={setCommentFilters} totalCount={commentsData?.count} publication={data} comments={commentsData} run={run} setRun={setRun} />
          </div>

          {/* ---------- SIDEBAR ---------- */}
          <div className="lg:col-span-1 space-y-5">
            <PublisherProfileCard
              publisher={{
                id: data?.id,
                full_name: data?.author_name,
                first_name: data?.first_name,
                image_url: data?.author_profile_pic
              }}
              user={user}
              showFollowButton
              isFollowing={false}
              onFollowToggle={(following) =>
                console.log(following ? "Followed" : "Unfollowed")
              }
            />

            {/* <ResearchInterestsCard
              interests={interests?.results}
              loading={interestLoading}
            /> */}

            {/* <SuggestedConnectionsCard
              title="Suggested Connections"
              suggestions={connectionSuggestions}
              limit={3}
              isLoading={false}
              onActionClick={(id) => console.log("Clicked member with ID:", id)}
            /> */}

            <Card className="shadow-none border-0 rounded-xl p-6">
              <h3 className="font-medium text-base mb-3 text-primary-green">Opportunities</h3>
              {opportunities?.results?.slice(0, 3)?.map((event: any) => (
                <EventAndOpportunityCard
                  key={event.id}
                  title={event.title}
                  deadline={event.deadline}
                  description={event.description}
                  link={`/opportunities/${event?.id}`}
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
          title: data?.title ?? "",
          abstract: data?.abstract ?? "",
          tags: data?.publication_type ?? [],
          thumbnail: data?.thumbnail ?? "",
          publicationLink: data?.document ?? "",
          publication_type: data?.publication_type ?? [],
          id: data?.id ?? "",
        }}
       
      />
    </PublicationsLayout>
  );
};

export default ResearchPublicationPage;
