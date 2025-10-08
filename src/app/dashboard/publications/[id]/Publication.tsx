"use client";
import {
  Calendar,
  Download,
  Eye,
  FileText,
  Home,
  MessageCircle,
  MoreVertical,
  Share2,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { BiCommentDetail, BiSolidLike } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import DocPlaceholder from "@/assets/doc_placeholder.png";
import { CommentsSection } from "@/components/blocks/Comments";
import { EventAndOpportunityCard } from "@/components/blocks/EventsAndOpportunityCard";
import { PublicationCard } from "@/components/blocks/PublicationCard";
import { TeamMemberCard } from "@/components/blocks/UsersCard";
import Breadcrumbs from "@/components/common/Breadcrumb";
import PublicationsLayout from "@/components/layouts/Publications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { events, team } from "../timeline/page";
import { useParams } from "next/navigation";
import { useGetPublicationByIdQuery } from "@/store/features/publications/actions";

const comments = [
  {
    id: "1",
    user: {
      name: "Chibu D.",
      avatar: "/avatars/chibu.png", // replace with actual path
    },
    time: "2hrs ago",
    text: `Absolutely fantastic TV! The picture quality is stunning with vibrant colors and deep blacks. The smart features are seamless and easy to navigate with the Magic Remote. The design is sleek and modern, fitting perfectly in my living room. Highly recommend! - Sarah M.`,
    likes: 40,
    replies: 1,
  },
  {
    id: "2",
    user: {
      name: "Daniel B.",
      avatar: "/avatars/daniel.png",
    },
    time: "1 day ago",
    text: `"The LG 75 inch UR80 Series is a great TV with excellent picture quality and smart features. The sound is good but not exceptional, so I added a soundbar for a more immersive experience. Overall, very satisfied with my purchase." - Sarah M.`,
    likes: 40,
    replies: 1,
  },
  {
    id: "3",
    user: {
      name: "Sarah M.",
      avatar: "/avatars/sarah.png",
    },
    time: "Reviewed 1 month ago",
    text: `"The LG 75 inch UR80 Series is a great TV with excellent picture quality and smart features. The sound is good but not exceptional, so I added a soundbar for a more immersive experience. Overall, very satisfied with my purchase." - James T.`,
    likes: 40,
    replies: 1,
  },
  {
    id: "4",
    user: {
      name: "Sarah M.",
      avatar: "/avatars/sarah2.png",
    },
    time: "23 Sept 2025",
    text: `"This TV offers a good viewing experience with clear and sharp picture quality. However, the setup was a bit confusing at first, and I had some trouble connecting to my Wi-Fi. Once everything was set up, it worked well, but the initial frustration cost it some points."`,
    likes: 40,
    replies: 1,
  },
];
const ResearchPublicationPage = () => {
  const {id} = useParams()

  console.log('id', id)
  const {data, isLoading} = useGetPublicationByIdQuery(id)

  console.log('data', data, isLoading)

  return (
    <PublicationsLayout>
      <div className=" py-3 container mx-auto">
        <Breadcrumbs />
      </div>
      <div className="min-h-screen  container mx-auto round">
        <div className=" ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-5 ">
              <div className="px-6 py-3 rounded-8 bg-white">
                <h1 className="text-xl font-bold capitalize text-black mb-4">
                  {data?.title}
                </h1>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-base text-gray-500 font-raleway">
                    <span className="text-primary-green">Published</span> • {data?.publication_date}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-[#D1AE6F40] text-base font-poppins font-normal rounded-full text-primary-green">
                      Research
                    </Badge>
                    <Badge className="bg-violet-100 text-base font-poppins font-normal rounded-full text-violet-600">
                      Case Study
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 font-raleway">
                  <span className="text-base text-gray-600">
                    <span className="text-primary-green ">Co-Author :</span>
                  </span>
                  <div className="flex gap-3 items-center">
                    <Avatar className="size-6">
                      <AvatarImage src="/assets/avatar.png" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-normal text-base text-[#3F434A]">
                        Dr. Amarachi Collins
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-1 text-gray-500">
                    <BiSolidLike className="w-4 h-4" />
                    <span className="text-sm">1</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <BiCommentDetail className="w-4 h-4" />
                    <span className="text-sm">2</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <PiShareFat className="w-4 h-4" />
                    <span className="text-sm">14</span>
                  </div>
                </div>

                <Separator className="border-primary-green mb-4" />

                <div className="flex gap-3 mb-4">
                  <Button
                    variant={"primary-green"}
                    className="px-6 py-2 w-[161px] h-11 font-normal"
                  >
                    <FileText className="w-4 h-4" />
                    Download PDF
                  </Button>
                  <Button
                    variant={"outline"}
                    className="px-6 py-2 w-[161px] font-normal h-11 border border-primary-green text-primary-green"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>

                <div className="flex items-center font-raleway gap-3 mb-4 text-base text-[#242424]">
                  <div className="flex items-center gap-1">
                    <Eye className="size-5" />
                    <span>15 Views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="size-5" />
                    <span>40 Pages</span>
                  </div>
                </div>

                <div className="">
                  <h2 className="text-base font-medium font-raleway text-gray-900 mb-4">
                    Abstract
                  </h2>
                  <div className="space-y-4 text-black text-base  font-raleway font-normal leading-relaxed">
                    <p className="text-justify" dangerouslySetInnerHTML={{
                          __html: data?.abstract ?? "",
                        }}>
                      
                    </p>
                  </div>

                  <div className="flex items-center gap-6 my-4">
                    <div className="flex items-center gap-1 text-gray-500">
                      <BiSolidLike className="w-4 h-4" />
                      <span className="text-sm">{data?.like_count}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <BiCommentDetail className="w-4 h-4" />
                      <span className="text-sm">2</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <PiShareFat className="w-4 h-4" />
                      <span className="text-sm">{data?.like_count}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Other Information */}
              <div className="px-6 py-3 rounded-8 bg-white">
                <div className=" ">
                  <h2 className="text-lg font-medium text-primary-green mb-4">
                    Other Information
                  </h2>

                  <div className="flex items-center gap-2 mb-4 font-raleway">
                    <span className="text-base text-gray-600">
                      <span className="text-primary-green ">Sector :</span>
                    </span>
                    <div className="flex gap-3 items-center">
                      <h4 className="font-normal capitalize text-base text-[#3F434A]">
                        {data?.sector_name}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4 font-raleway">
                    <span className="text-base text-gray-600">
                      <span className="text-primary-green ">
                        Contributors :
                      </span>
                    </span>
                    <div className="flex gap-3 items-center">
                      <Avatar className="size-6">
                        <AvatarImage src="/assets/avatar.png" />
                        <AvatarFallback>AC</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-normal text-base text-[#3F434A]">
                          Dr. Amarachi Collins
                        </h4>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Avatar className="size-6">
                        <AvatarImage src="/assets/avatar.png" />
                        <AvatarFallback>AC</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-normal text-base text-[#3F434A]">
                          Dr. Amarachi Collins
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 rounded-8 bg-white">
                {/* Related Publications */}
                <div className="">
                  <h2 className="text-lg font-medium text-primary-green mb-4">
                    Related Publications
                  </h2>
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="border border-gray-200 rounded-lg p-6 mb-4"
                    >
                      <PublicationCard
                        image={DocPlaceholder}
                        title="Policy Pathways to Scale: Enabling a Conducive Environment for Impact Investing in Nigeria — 2025"
                        abstract="Abstract: An nationwide overview of Nigeria’s growing impact investing ecosystem—key players, funding trends, regulatory landscape, and strategic gaps to watch in 2025."
                        tags={[
                          {
                            label: "Research",
                            colorClass: "bg-[#D1AE6F40]",
                            textClass: "text-primary-green",
                          },
                        ]}
                        onViewPaper={() => console.log("View Paper")}
                        // onDownload={() => console.log("Download PDF")}
                        // onLike={() => console.log("Liked")}
                        // onComment={() => console.log("Comment")}
                        // onShare={() => console.log("Shared")}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <CommentsSection
                comments={comments}
                totalCount={5}
                totalPages={9}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-5">
              {/* Author Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 ">
                <h3 className="text-base font-medium text-center text-[#3F434A] mb-4">
                  About this Author
                </h3>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-26 h-26">
                    <AvatarImage src="/assets/avatar.png" alt="Profile" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <h4 className="text-base font-medium text-[#3F434A] mb-1">
                    Thomas Jackson
                  </h4>
                  <p className="text-sm font-normal text-[#475467] mb-4">
                    University of Lagos, law
                    <br /> Faculty Member
                  </p>

                  <div className="flex gap-8 mb-4">
                    <div className="text-center">
                      <div className="text-base font-medium text-[#475467]">
                        2
                      </div>
                      <div className="text-[9px] text-[#475467]">
                        Publications
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-base font-medium text-[#475467]">
                        0
                      </div>
                      <div className="text-[9px] text-[#475467]">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-base font-medium text-[#475467]">
                        0
                      </div>
                      <div className="text-[9px] text-[#475467]">
                        Connections
                      </div>
                    </div>
                  </div>

                  <div>
                    <Button
                      variant={"primary-green"}
                      className="h-11 w-[161px] rounded-8"
                    >
                      Following
                    </Button>
                  </div>
                </div>
              </div>

              {/* Research Interests */}
              <Card className="shadow-none border-0 rounded-xl">
                <CardContent className="">
                  <h3 className="font-medium text-base text-[#3F434A] mb-3">
                    Research Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className="text-sm font-normal  bg-[#F6EDE1] rounded-full"
                      variant="secondary"
                    >
                      Agriculture
                    </Badge>
                    <Badge
                      className="text-sm font-normal rounded-full"
                      variant="secondary"
                    >
                      Education
                    </Badge>
                    <Badge
                      className="text-sm font-normal  bg-[#F6EDE1] rounded-full"
                      variant="secondary"
                    >
                      Healthcare
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Suggested Connections */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 ">
                <h3 className="font-medium text-base mb-3 text-primary-green">
                  Suggested Connections
                </h3>
                <div className="space-y-4">
                  {team.map((member) => (
                    <TeamMemberCard
                      key={member.id}
                      name={member.name}
                      role={member.role}
                      avatarUrl={member.avatarUrl}
                      onActionClick={() =>
                        console.log(`Action for ${member.name}`)
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Opportunities */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-medium text-base mb-3 text-primary-green">
                  Opportunities
                </h3>
                <div className="space-y-4">
                  {events.map((event) => (
                    <EventAndOpportunityCard
                      key={event.id}
                      title={event.title}
                      deadline={event.deadline}
                      description={event.description}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicationsLayout>
  );
};

export default ResearchPublicationPage;
