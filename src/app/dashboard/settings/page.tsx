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
  BookArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
              className="rounded-t-lg p-4 bg-gray-100 font-poppins text-sm font-medium data-[state=active]:bg-primary-green text-white transition-all"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notification"
              className="rounded-t-lg p-4 bg-gray-100 font-poppins text-sm font-medium data-[state=active]:bg-primary-green text-white transition-all"
            >
              Notification
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="rounded-t-lg p-4 bg-gray-100 font-poppins text-sm font-medium data-[state=active]:bg-primary-green text-white transition-all"
            >
              Change Password
            </TabsTrigger>
          </TabsList>

          {/* ===== PROFILE TAB ===== */}
          <TabsContent value="profile">
            <Card className="shadow-sm border-none rounded-sm p-5">
              {/* ==== Personal Information ==== */}
              <div className="flex items-center gap-2 mt-2 text-gray-500">
                <div className="p-3 rounded-xl bg-green-200">
                  <Book className="w-4 h-4 text-green-600" />
                </div>
                <h2 className="text-[20px] font-poppins font-medium">
                  Personal Information
                </h2>
              </div>

              <CardContent className="p-6 border w-full rounded">
                <div className="flex flex-col space-y-6">
                  {/* ==== TOP SECTION ==== */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-green-600">
                        <Image
                          src={userData.image}
                          alt={userData.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-[20px] font-medium text-gray-800">
                          {userData.name}
                        </h2>
                        <p className="text-[14px] text-gray-600 mt-1">
                          {userData.address}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>{userData.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{userData.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Linkedin className="w-4 h-4" />
                            <a
                              href={`https://${userData.linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary-green underline"
                            >
                              {userData.linkedin}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ==== BIO ==== */}
                  <div className="w-full mt-4">
                    <p className="font-medium text-[20px] mb-1">Bio</p>
                    <p className="text-[14px] text-gray-600 leading-relaxed">
                      {userData.bio}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Link className="w-4 h-4" />
                      <a
                        href={`https://${userData.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary-green underline text-[14px] text-gray-600"
                      >
                        {userData.website}
                      </a>
                    </div>
                  </div>

                  {/* ==== EDIT PROFILE BUTTON ==== */}
                  <div className="flex justify-end">
                    <div className="flex items-center gap-2">
                      <Pen className="w-4 h-4" />
                      <a
                        href="#"
                        className="hover:text-primary-green underline text-[14px] text-gray-600"
                      >
                        Edit Profile
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* ==== QUALIFICATION ==== */}
              <div className="flex items-center gap-2 mt-2 text-gray-500">
                <div className="p-3 rounded-xl bg-orange-200">
                  <GraduationCap className="w-4 h-4 text-orange-600" />
                </div>
                <h2 className="text-[20px] font-poppins font-medium">
                  Qualification
                </h2>
              </div>

              <CardContent className="p-6 border w-full rounded">
                {userData.qualifications?.map((qual, index) => (
                  <div key={index}>
                    <p className="text-[18px] font-medium text-gray-800">
                      {qual.title}, {qual.field}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span>{qual.institution}</span>
                    </div>
                    {index !== userData.qualifications!.length - 1 && (
                      <hr className="my-3 border-gray-200" />
                    )}
                  </div>
                ))}
              </CardContent>

              {/* ==== RESEARCH INTERESTS ==== */}
              <div className="flex items-center gap-2 mt-2 text-gray-500">
                <div className="p-3 rounded-xl bg-blue-200">
                  <Heart className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-[20px] font-poppins font-medium">
                  Research Interests
                </h2>
              </div>

              <CardContent className="p-6 border w-full rounded">
                <div className="flex flex-wrap gap-2">
                  {userData.researchInterests?.map((interest, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        colorMap[interest] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                <hr className="my-3 border-gray-200" />
                
                  {/* ==== EDIT PROFILE BUTTON ==== */}
                  <div className="flex justify-end">
                    <div className="flex items-center gap-2">
                      <Pen className="w-4 h-4" />
                      <a
                        href="#"
                        className="hover:text-primary-green underline text-[14px] text-gray-600"
                      >
                        Edit Profile
                      </a>
                    </div>
                  </div>
              </CardContent>

              {/* ==== RESEARCH AREA ==== */}
              <div className="flex items-center gap-2 mt-2 text-gray-500">
                <div className="p-3 rounded-xl bg-red-200">
                  <BookArrowDown className="w-4 h-4 text-red-600" />
                </div>
                <h2 className="text-[20px] font-poppins font-medium">
                  Research Area
                </h2>
              </div>

              <CardContent className="p-6 border w-full rounded">
                <div className="p-6 space-y-2">
                <p className="text-sm text-gray-600 leading-relaxed">{userData.researchArea}</p>
                </div>
                
                  {/* ==== EDIT PROFILE BUTTON ==== */}
                  <div className="flex justify-end">
                    <div className="flex items-center gap-2">
                      <Pen className="w-4 h-4" />
                      <a
                        href="#"
                        className="hover:text-primary-green underline text-[14px] text-gray-600"
                      >
                        Edit Profile
                      </a>
                    </div>
                  </div>
              </CardContent>
            </Card>
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



