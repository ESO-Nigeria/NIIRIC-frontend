"use client";

import {
  Calendar,
  Download,
  FileText,
  MessageSquare,
  MoreHorizontal,
  MoreVertical,
  Share,
  Share2,
  ThumbsUp,
  Upload,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiShareFat } from "react-icons/pi";
import { useSelector } from "react-redux";
import DocPlaceholder from "@/assets/doc_placeholder.png";
import { EventAndOpportunityCard } from "@/components/blocks/EventsAndOpportunityCard";
import { PublicationCard } from "@/components/blocks/PublicationCard";
import { TeamMemberCard } from "@/components/blocks/UsersCard";
import PublicationsLayout from "@/components/layouts/Publications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/store";
import {
  useGetAllPublishersProfileQuery,
  useGetUserInterestsQuery,
} from "@/store/features/auth/actions";
import {
  useGetPublicationsQuery,
  useGetUserPublicationsQuery,
} from "@/store/features/publications/actions";
import { Profile, Publication, User } from "@/components/types/profile";
import PublicationCardSkeleton from "@/components/common/PublicationCardSkeleton";
import { badgeColors } from "@/store/mockData/mockdata";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetEventsQuery, useGetSuggestedConnectionsQuery } from "@/store/features/general/actions";
import { useGetOpportunitiesQuery } from "@/store/features/opportunities/actions";
import { downloadPdfFromUrl, forceDownloadPdf, getInitials, mapTagsToPublicationColors } from "@/helpers/helpers";
import PublicationShareModal from "@/components/common/PublicationShareModal";

import { useState } from "react";

export const team = [
  {
    id: 1,
    name: "Dr. Amarachi Collins",
    role: "Senior Researcher",
    avatarUrl: "",
  },
  {
    id: 2,
    name: "John Okafor",
    role: "Policy Analyst",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

interface ShareDocumentState {
  open: boolean;
  data: {
    title?: string;
    abstract?: string;
    tags?: string[];
		publication_type?: string[];
    thumbnail?: string;
    document?: string;
    id?: string;
  };
}
export default function Publications() {
  const [shareDocument, setShareDocument] = useState<ShareDocumentState>({
    open: false,
    data: {}
  })
  const {
    data: userInterests,
    isLoading: interest_loading,
    refetch: refetchInterest,
  } = useGetUserInterestsQuery({});

  const {
    data: events,
    isLoading: event_loading,
    refetch: refetchEvent,
  } = useGetEventsQuery({});

	const {
		data: opportunities,
		isLoading: opportunities_loading,
		refetch: refetchOpportunities
	} = useGetOpportunitiesQuery({})

  const { 
    data: connection_suggestions,
    isLoading: loading_connections,
    refetch: refetchConnection
   } = useGetSuggestedConnectionsQuery({})

  const {
    data: recommendedPublications,
    isLoading: isRecLoading,
    isError: isRecError,
    refetch: refetchPublication
  } = useGetPublicationsQuery({});

  const {
    data: myPublications,
    isLoading: myPublicationLoading,
    isError: myPublicationError,
  } = useGetUserPublicationsQuery({});


  const publisher = useSelector(
    (state: RootState) => state.auth.profile as Profile | null
  );

  const router = useRouter();

  const user = useSelector((state) => (state as RootState).auth.user as User | null);
  const { data: publishers } = useGetAllPublishersProfileQuery({});

  return (
    <PublicationsLayout>
      <div className="flex container mx-auto flex-col md:flex-row gap-6 p-6 bg-[#F8F9F7] min-h-screen text-[#1B1B1B]">
        {/* Left Sidebar */}
        <aside className="w-full md:w-1/4 space-y-6">
          {/* Profile Card */}
          <Card className="shadow-none border-0 rounded-xl">
            <CardHeader className="flex flex-col items-center p-4">
              <Avatar className="w-26 h-26">
                <AvatarImage src={publisher?.profile_pic} alt="Profile" />
                <AvatarFallback>
                  {publisher?.first_name?.[0]}
                  {publisher?.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4  capitalize font-medium text-base text-[#3F434A]">
                {publisher?.title} {publisher?.first_name}{" "}
                {publisher?.last_name}
              </h2>
              {/* <p className="text-sm text-[#475467]">Emeritus</p> */}
              <div className="flex justify-between w-full mt-4 text-center">
                <div>
                  <p className="font-medium text-[#475467] text-base">
                    {user?.publication_count}
                  </p>
                  <p className="text-[9px] text-[#475467]">Publications</p>
                </div>
                <div>
                  <p className="font-medium text-[#475467] text-base">
                    {user?.follower_count}
                  </p>
                  <p className="text-[9px] text-[#475467]">Followers</p>
                </div>
                <div>
                  <p className="font-medium text-[#475467] text-base">0</p>
                  <p className="text-[9px] text-[#475467]">Contributions</p>
                </div>
              </div>
            </CardHeader>
          </Card>
          <Card className="shadow-none border-0 rounded-xl">
            <CardContent className="">
              <h3 className="font-medium text-base text-[#3F434A] mb-3">
                Research Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {interest_loading && (
                  <Skeleton className="h-8 w-full rounded-full" />
                )}
                {userInterests?.results?.map((interest: any, index: number) => {
                  const colorClass = badgeColors[index % badgeColors.length];
                  const label = interest?.interest_display
                    ?.replace(/_/g, " ")
                    ?.toLowerCase();

                  return (
                    <Badge
                      key={interest.id || index}
                      variant="secondary"
                      className={`text-sm font-normal capitalize rounded-full ${colorClass}`}
                    >
                      {label}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-2/4 space-y-6">
          {/* Upload Post */}
          <Card className="shadow-none border rounded-xl p-4 flex flex-row items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={publisher?.profile_pic} alt="User" />
              <AvatarFallback>
                {publisher?.first_name?.[0]}
                {publisher?.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <Input
              placeholder="Share your research insights"
              className="flex-1 h-11"
            />
            <Button
              variant="primary-green"
              className="rounded-lg font-dm_sans font-medium"
              asChild
            >
              <Link href={"/dashboard/publications/upload"}>Upload Post</Link>
            </Button>
          </Card>

          {/* My Publications */}
          {/* <section>
						<h3 className="font-medium text-lg mb-3 text-primary-green">
							My Publications
						</h3>
						<Card className="shadow-none gap-3 rounded-xl p-6">
							<div className="flex justify-between">
								<div className="flex items-center gap-3">
									<Avatar className="size-12">
										<AvatarImage src={publisher?.image_url} alt="Profile" />
										<AvatarFallback>
											{publisher?.first_name?.[0]}
											{publisher?.last_name?.[0]}
										</AvatarFallback>
									</Avatar>

									<div>
										<h4 className="font-normal capitalize text-base text-[#3F434A]">
											{publisher?.title} {publisher?.first_name}{" "}
											{publisher?.last_name}
										</h4>
										<p className="text-sm text-[#667085]">Senior Researcher</p>
									</div>
								</div>
								<MoreHorizontal className="text-gray-500" />
							</div>
							{myPublicationLoading ? (
								<p>Loading...</p>
							) : myPublicationError ? (
								<p>Error loading publications.</p>
							) : myPublications && myPublications?.results.length === 0 ? (
								<p>No publications found.</p>
							) : myPublications ? (
								myPublications?.results?.map((pub: Publication) => (
									<>
										<PublicationCard
											image={DocPlaceholder}
											title={pub?.title}
											abstract={pub?.abstract}
											tags={mapTagsToPublicationColors(pub?.publication_type ?? []) ?? null}
											onViewPaper={() =>
												router.push(`/dashboard/publications/${pub.id}`)
											}
											onDownload={() => downloadPDF(pub.document ?? "")}
											onLike={() => console.log("Liked")}
											onComment={() => console.log("Comment")}
											onShare={() => console.log("Shared")}
											{...pub}
										/>
										<Separator className="my-5" />
									</>
								))
							) : null}
						</Card>
					</section> */}

          {/* Recommended Section */}
          <section>
            <h3 className="font-medium text-lg mb-3 text-primary-green">
              Publications
            </h3>

            {isRecLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <PublicationCardSkeleton key={i} />
              ))
            ) : isRecError ? (
              <p>Error loading publications.</p>
            ) : recommendedPublications &&
              recommendedPublications?.results.length === 0 ? (
              <p>No publications found.</p>
            ) : recommendedPublications ? (
              recommendedPublications?.results?.map((pub: Publication) => (
                
                <Card
                  key={pub?.id}
                  className="shadow-none mb-4 gap-3 rounded-xl p-6 hover:border-primary-green"
                >
                  <div className="flex justify-between">
                    <div className="flex gap-3">
                      <Avatar asChild  className="size-12">
                        <Link href={`/user-profile/${pub?.author}`}>
                        <AvatarImage src={pub?.author_profile_pic || undefined} />
                        <AvatarFallback>{getInitials(pub?.author_name)}</AvatarFallback>
                        </Link>
                        
                      </Avatar>
                      <div>
                        <Link href={`/user-profile/${pub?.author}`} className="font-normal text-base text-[#3F434A]">
                          {pub?.author_name}
                        </Link>
                        <p className="text-sm text-[#667085] capitalize">
                      {pub?.author_qualifications && pub?.author_qualifications?.length > 0
                      ? pub?.author_qualifications?.map((item: any) => item?.position_display).filter(Boolean).join(', ')
                      : "No qualifications listed"}
                        </p>
                      </div>
                    </div>
                    <MoreHorizontal className="text-gray-500" />
                  </div>
                  <PublicationCard
                    image={DocPlaceholder}
                    title={pub?.title}
                    abstract={pub?.abstract}
                    tags={mapTagsToPublicationColors(pub?.publication_type ?? []) ?? null}
                    onViewPaper={() =>
                      router.push(`/dashboard/publications/${pub.id}`)
                    }
                    onDownload={() => forceDownloadPdf(pub.document ?? "", pub?.title)}
                    showLikeShareButtons
                    onLike={() => refetchPublication()}
                    // onComment={() => console.log("Comment")}
                    onShare={() => {
                      setShareDocument({
                        open: true,
                        data: pub
                      })
                    }}
                    {...pub}
                  />
                </Card>
              ))
            ) : null}
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="w-full md:w-1/4 space-y-6">
          {/* Upcoming Events */}
          <Card className="shadow-none gap-3 border-0 rounded-xl p-6">
            <h3 className="font-medium text-base mb-3 text-primary-green">
              Upcoming Event
            </h3>
            {events?.results?.slice(0, 3)?.map((event: {id: string, title: string, deadline: string, description: string, registration_deadline: string}) => (
              <EventAndOpportunityCard
                key={event.id}
                title={event.title}
                deadline={event?.registration_deadline}
                description={event.description}
                link={`/events/${event.id}`}
              />
              // <p>events</p>
            ))}
          </Card>

          {/* Suggested Connections */}
          <Card className="shadow-none gap-3  border-0 rounded-xl p-6">
            <h3 className="font-medium text-base mb-3 text-primary-green">
              Suggested Connections
            </h3>
            <div className="space-y-3">
              {connection_suggestions?.slice(0,3)?.map((member: {id: string, full_name: string, qualifications: [],  profile_pic: string}) => (
                <TeamMemberCard
                  key={member.id}
                  id={member?.id}
                  name={member.full_name}
                  role={member.qualifications?.map((item: {position: string}) => item?.position).join(', ') ?.replace(/_/g, " ")
                    ?.toLowerCase()}
                  avatarUrl={member.profile_pic}
                  onActionClick={() => console.log(`Action for ${member.full_name}`)}
                />
                // <p>team</p>
              ))}
            </div>
          </Card>

          {/* Opportunities */}
          <Card className="shadow-none gap-3 border-0 rounded-xl p-6">
            <h3 className="font-medium text-base mb-3 text-primary-green">
              Opportunities
            </h3>
            {opportunities?.results?.slice(0, 3)?.map((event: {id: string, title: string, deadline: string, description: string}) => (
							<EventAndOpportunityCard
								key={event.id}
								title={event.title}
								deadline={event.deadline}
								description={event.description}
                link={`/opportunities/${event.id}`}
							/>
						))}
          </Card>
        </aside>
      </div>
      <PublicationShareModal
        isOpen={shareDocument?.open}
        onClose={() => setShareDocument({open: false, data: {}})}
        publication={{
          title: shareDocument?.data?.title ?? "",
          abstract: shareDocument?.data?.abstract ?? "",
          tags: shareDocument?.data?.publication_type ?? [],
          thumbnail: shareDocument?.data?.thumbnail ?? "",
          publicationLink: shareDocument?.data?.document ?? "",
          publication_type: shareDocument?.data?.publication_type ?? [],
          id: shareDocument?.data?.id ?? "",
        }}
       
      />
    </PublicationsLayout>
  );
}
