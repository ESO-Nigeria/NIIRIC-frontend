"use client";

import { useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Breadcrumbs from "@/components/common/Breadcrumb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Mail, Phone, Linkedin, Link, Pen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const [statusValue, setStatusValue] = useState("profile");
  const [currentPage, setCurrentPage] = useState(1);

  const handleStatusChange = (value: string) => {
    setStatusValue(value);
    setCurrentPage(1);
  };

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
    link?: string;
    phone?: string;
    website?: string;
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
    link: "orcid.org/0000-0002-0875-2624",
    phone: "+234 803 323 478",
    website: "www.6thtouch.tech",
    researchInterests: ["Agriculture", "Education", "Healthcare"],
    researchArea:
      "Dr. Amarachi Collins is a development economist and researcher with a strong focus on social finance and inclusive growth.",
  };

  return (
    <DashboardLayout>
      <div className="pb-2">
        <Breadcrumbs />
      </div>

      <div className="w-full mx-auto py-8">
        <Tabs value={statusValue} onValueChange={handleStatusChange} className="w-full">
          <TabsList className={cn("flex gap-1 bg-transparent mb-0")}>
            <TabsTrigger
              value="profile"
              className="rounded-t-lg p-4 bg-gray-100 font-poppins text-sm font-medium data-[state=active]:bg-primary-green data-[state=active]:font-poppins text-white transition-all"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notification"
              className="rounded-t-lg p-4 bg-gray-100 font-poppins text-sm font-medium data-[state=active]:bg-primary-green data-[state=active]:font-poppins text-white transition-all"
            >
              Notification
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="rounded-t-lg p-4 bg-gray-100 font-poppins text-sm font-medium data-[state=active]:bg-primary-green data-[state=active]:font-poppins text-white transition-all"
            >
              Change Password
            </TabsTrigger>
          </TabsList>

          {/* ===== PROFILE TAB ===== */}
          <TabsContent value="profile">
            <Card className="shadow-sm border-none rounded-sm p-5">
              <div className="flex items-center gap-2 mt-1 font-poppins text-sm font-poppins text-gray-500">
                <div className="p-3 rounded-xl bg-green-200 mb-3">
                  <Book className="w-4 h-4 font-poppins text-green-600" />
                </div>
                <h2 className="font-poppins text-[24px] font-poppins mb-4">Profile Settings</h2>
              </div>

              <CardContent className="p-6 border w-full rounded">
                <div className="flex flex-col space-y-6">
                  {/* ==== TOP SECTION ==== */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-6">
                    {/* LEFT SIDE - Image and basic info */}
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
                        <h2 className="font-poppins text-[20px] font-poppins font-medium  font-poppins text-gray-800">{userData.name}</h2>
                        <p className="font-poppins text-[14px] font-poppins text-gray-600 mt-1">{userData.address}</p>
                        <div className="flex font-poppins text-[14px] font-poppins text-gray-600 gap-2">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 font-poppins " />
                            <span>{userData.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 font-poppins " />
                            <span>{userData.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Linkedin className="w-4 h-4 font-poppins " />
                            <a
                              href={`https://${userData.linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary-green font-poppins text-gray-600 underline"
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
                    <p className="font-bold mb-1">Bio</p>
                    <p className="font-poppins text-[16px] font-poppins text-gray-600 leading-relaxed">{userData.bio}</p>
                          <div className="flex items-center gap-2">
                            <Link className="w-4 h-4 font-poppins " />
                            <a
                              href={`https://${userData.link}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary-green font-poppins text-gray-600 underline"
                            >
                              {userData.link}
                            </a>
                          </div>
                  </div>
                          {/* ==== EDIT PROFILE BUTTON ==== */}
                          <div className="flex justify-end">
                            <div className="flex items-center gap-2">
                              <Pen className="w-4 h-4" />
                              <a
                                href={`https://${userData.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary-green font-poppins text-gray-600 underline"
                              >
                                Edit Profile
                              </a>
                            </div>
                          </div>

                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== NOTIFICATION TAB ===== */}
          <TabsContent value="notification">
            <Card className="shadow-sm border-none rounded-sm">
              <CardContent className="p-4">
                <h2 className="font-poppins text-lg font-semibold mb-4">Notification Settings</h2>
                <p className="font-poppins text-sm font-poppins text-gray-600">Manage your app notifications here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== PASSWORD TAB ===== */}
          <TabsContent value="password">
            <Card className="shadow-sm border-none rounded-sm">
              <CardContent className="p-4">
                <h2 className="font-poppins text-lg font-semibold mb-4">Change Password</h2>
                <p className="font-poppins text-sm font-poppins text-gray-600">Change your password securely here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
