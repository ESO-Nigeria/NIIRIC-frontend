"use client";

import { useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Breadcrumbs from "@/components/common/Breadcrumb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Book,
  Mail,
  Phone,
  Linkedin,
  Link,
  Pen,
  GraduationCap,
  Building,
  Heart,
  LucideBookDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SettingsPage from "@/app/settings/page";

export default function Settings() {
  const [statusValue, setStatusValue] = useState("profile");

  const handleStatusChange = (value: string) => {
    setStatusValue(value);
  };

  interface Qualification {
    title: string;
    field: string;
    institution: string;
  }

  interface UserProfile {
    name: string;
    university: string;
    course: string;
    publications: number;
    followers: number;
    contributions: number;
    bio: string;
    image: string;
    address?: string;
    email?: string;
    linkedin?: string;
    phone?: string;
    website?: string;
    qualifications?: Qualification[];
    researchInterests?: string[];
    researchArea?: string;
  }

  const userData: UserProfile = {
    name: "Dr. Amarachi Collins",
    university: "University of Lagos",
    course: "Computer Science",
    publications: 3,
    followers: 1,
    contributions: 0,
    bio: "Dr. Amarachi Collins is a development economist and researcher with a strong focus on social finance and inclusive growth. She has contributed to studies on impact measurement in West Africa and often collaborates with networks that advance sustainable investment practices.",
    image: "/assets/images/avatar.png",
    address: "Lagos, Nigeria",
    email: "collinsamarachi@gmail.com",
    linkedin: "linkedin.com/amarachi-collins",
    website: "orcid.org/0000-0002-0875-2624",
    phone: "+234 803 323 478",
    researchInterests: ["Agriculture", "Education", "Healthcare"],
    qualifications: [
      {
        title: "Faculty Member",
        field: "Economics",
        institution: "University of Lagos",
      },
      {
        title: "Post Doctorate",
        field: "Economics",
        institution: "Julius–Maximzburgwilliams–Universität Würzburg",
      },
    ],
    researchArea:
      "Dr. Amarachi Collins is a development economist and researcher with a strong focus on social finance and inclusive growth.",
  };

  const colorMap: Record<string, string> = {
    Agriculture: "bg-yellow-100 text-yellow-800",
    Education: "bg-green-100 text-green-800",
    Healthcare: "bg-red-100 text-red-800",
  };

  return (
    <DashboardLayout>
      <div className="pb-2">
        <Breadcrumbs />
      </div>

      <div className="w-full mx-auto py-8">
        <Tabs
          value={statusValue}
          onValueChange={handleStatusChange}
          className="w-full"
        >
          <TabsList className={cn("flex gap-1 bg-transparent mb-0")}>
            <TabsTrigger
              value="profile"
              className="rounded-t-lg p-10 bg-gray-100 font-poppins text-sm font-medium data-[state=active]:bg-primary-green data-[state=active]:text-white! text-white transition-all"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notification"
              className="rounded-t-lg p-10 bg-gray-100 font-poppins text-sm font-medium data-[state=active]:bg-primary-green data-[state=active]:text-white! text-white transition-all"
            >
              Notification
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="rounded-t-lg p-10 bg-gray-100 font-poppins text-sm font-medium data-[state=active]:bg-primary-green data-[state=active]:text-white! text-white transition-all"
            >
              Change Password
            </TabsTrigger>
          </TabsList>

          {/* ===== PROFILE TAB ===== */}
          <TabsContent value="profile">
           <SettingsPage />
          </TabsContent>

          {/* ===== NOTIFICATION TAB ===== */}
          <TabsContent value="notification">
            <Card className="shadow-sm border-none rounded-sm">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">
                  Notification Settings
                </h2>
                <p className="text-sm text-gray-600">
                  Manage your app notifications here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== PASSWORD TAB ===== */}
          <TabsContent value="password">
            <Card className="shadow-sm border-none rounded-sm">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Change Password</h2>
                <p className="text-sm text-gray-600">
                  Change your password securely here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}



