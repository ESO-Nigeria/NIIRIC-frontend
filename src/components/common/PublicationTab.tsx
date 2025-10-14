"use client";

import {
  ArrowRight,
  BookTextIcon,
  BookUp,
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
import { PiShareFat } from "react-icons/pi";
import { useSelector } from "react-redux";
import DocPlaceholder from "@/assets/doc_placeholder.png";
import { EventAndOpportunityCard } from "@/components/blocks/EventsAndOpportunityCard";
import { PublicationCard } from "@/components/blocks/PublicationCard";
import { TeamMemberCard } from "@/components/blocks/UsersCard";
import Breadcrumbs from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import PublicationsLayout from "@/components/layouts/Publications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store";
import {
  useGetPublicationsQuery,
  useGetUserPublicationsQuery,
} from "@/store/features/publications/actions";
import { Profile, User } from "@/components/types/profile";
import { selectCurrentUser } from "@/store/features/auth/selectors";

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

export const events = [
  {
    id: 1,
    title: "Catalyst Impact Fund - Small Grants for Early-Stage",
    deadline: "01 June 2025",
    description:
      "The Nigeria Impact Investing Research Industry Collaborative (NIIRC) is Nigeria’s premier network dedicated to advancing",
  },
  {
    id: 2,
    title: "Green Innovation Challenge",
    deadline: "15 July 2025",
    description:
      "Empowering local startups with grants to tackle environmental and sustainability challenges in Nigeria.",
  },
];


export default function PublicationsTab() {
  const {
    data: myPubications,
    isLoading,
    isError,
  } = useGetUserPublicationsQuery({}); //useGetMyPublicationsQuery();
  const {
    data: recommendedPublications,
    isLoading: isRecLoading,
    isError: isRecError,
  } = useGetPublicationsQuery({}); //useGetRecommendedPublicationsQuery();

    // const user = useSelector(selectCurrentUser);
  const user = useSelector((state) => (state as RootState).auth.user as User | null);
    
  const profile = useSelector((state: RootState) => state.auth.profile as Profile | null);

  const stats = [
  {
    label: "All",
    value: user?.publication_count || 0,
    icon: BookTextIcon,
    color: "text-[#12B76A] bg-[#A6F4C5]/20 ",
  },
  {
    label: "Published",
    value: 0,
    icon: BookUp,
    color: "text-[#12B76A] bg-[#A6F4C5]/20",
  },
  {
    label: "Pending Approval",
    value: 0,
    icon: ArrowRight,
    color: "bg-[#FEF0C7] text-[#DC6803]",
  },
];

  return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="shadow-none border-none">
              <CardContent className="flex gap-4 items-center ">
                <span
                  className={` p-2 size-8 rounded-lg flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6 " />
                </span>

                <div className="flex gap-3 flex-col ">
                  <span className="text-base text-[#667085] font-medium">
                    {stat.label}
                  </span>
                  <span className="text-base text-[#3F434A] font-medium">
                    {stat.value}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
     
  );
}
