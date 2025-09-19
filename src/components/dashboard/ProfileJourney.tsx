"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  User,
  GraduationCap,
  Heart,
  Building,
  ContactRound,
} from "lucide-react";

export function ProfileJourney() {
  return (
    <Card className="mb-8 p-8 border-0 shadow-none rounded-8 font-poppins">
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[28px] font-poppins font-medium">Your NIIRIC Profile Journey</h2>
          {/* <Progress value={16} className="w-40" /> */}
        </div>
        <p className="text-sm text-gray-600">
          Update your personal information, add your qualification, interests and share research area.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Information */}
          
          <Card className="border-primary-green shadow-none bg-green-50">
            <CardContent className="flex flex-col gap-3">
              <span className="bg-[#D1FADF] text-[#039855] p-2 size-8 rounded-lg flex items-center justify-center">
                  <ContactRound className="h-5 w-5" />
              </span>
               
              <div className="flex text-base items-center text-[#3F434A]">
                <span className="font-medium">Personal Information</span>
              </div>
              <p className="text-sm text-[#3F434A]">
                Update your personal information.
              </p>
              <div>
                 <Button variant={"primary-green"} className="w-36">Update</Button>
              </div>
             
            </CardContent>
          </Card>

          {/* Qualification */}
          <Card className="border shadow-none ">
            <CardContent className="flex flex-col gap-3">
              <span className="bg-[#FEF0C7] text-[#DC6803] p-2 size-8 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5" />
              </span>
               
              <div className="flex text-base items-center text-[#3F434A]">
                <span className="font-medium">Qualification</span>
              </div>
              <p className="text-sm text-[#3F434A]">
                Add your educational background and degrees.
              </p>
              <div>
                 <Button variant={"primary-green"} className="w-36">Add Qualification</Button>
              </div>
             
            </CardContent>
          </Card>
         

          {/* Research Interests */}
           <Card className="border shadow-none ">
            <CardContent className="flex flex-col gap-3">
              <span className="bg-[#D1E9FF] text-[#0086C9] p-2 size-8 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5" />
              </span>
               
              <div className="flex text-base items-center text-[#3F434A]">
                <span className="font-medium">Research Interests</span>
              </div>
              <p className="text-sm text-[#3F434A]">
                Define your areas of interest and expertise.
              </p>
              <div>
                 <Button variant={"primary-green"} className="w-36">Add Interests</Button>
              </div>
             
            </CardContent>
          </Card>
          

          {/* Research Area */}

           <Card className="border shadow-none ">
            <CardContent className="flex flex-col gap-3">
              <span className="bg-[#FEE4E2] text-[#D92D20] p-2 size-8 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5" />
              </span>
               
              <div className="flex text-base items-center text-[#3F434A]">
                <span className="font-medium">Research Area (Optional)</span>
              </div>
              <p className="text-sm text-[#3F434A]">
                                Connect with like minds by letting them know what you are working on.
              </p>
              <div>
                 <Button variant={"primary-green"} className="w-36">Add Institution</Button>
              </div>
             
            </CardContent>
          </Card>

        </div>
      </CardContent>
    </Card>
  );
}
