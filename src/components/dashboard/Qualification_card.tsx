"use client";

import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Building2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PencilWithLine } from "@/assets/icons/icons";
import { Qualification } from "../types/profile";

// type Qualification = {
//   role: string;
//   institution: string;
//   position_display: string;
//   department: string;
// };

type QualificationCardProps = {
  title?: string;
  qualifications: Qualification[];
  onEdit?: () => void;
};

export function QualificationCard({
  title = "Qualification",
  qualifications,
  onEdit,
}: QualificationCardProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="rounded-xl bg-[#FFF4E5] text-[#F79009] p-2 size-8 flex items-center justify-center">
          <GraduationCap className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-normal">{title}</h2>
      </div>

      {/* Card */}
      <Card className="p-0 shadow-none">
        <CardContent className="py-6 px-8">
          <div className="space-y-4">
            {qualifications.length > 0 ? (
              qualifications.map((item, idx) => (
                <div
                  key={idx}
                  className="pb-4 border-b last:border-0 last:pb-0 capitalize"
                >
                  <h3 className="font-medium text-lg text-[#3F434A]">{item.position_display}, {item.department}</h3>
                  <div className="flex items-center gap-2 text-sm text-[#475467] mt-1">
                    <Building2 className="h-4 w-4 text-[#98A2B3]" />
                    <span >{item.institution}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No qualifications added yet.
              </p>
            )}
          </div>

          {/* Edit Button */}
          {/* {onEdit && ( */}
            <div className="flex justify-end mt-4">
              <Button
                size={"sm"}
                variant="link"
                className="ml-auto font-normal text-primary-green underline text-base"
                // onClick={onEdit}
              >
                <PencilWithLine className="h-4 w-4" />
                Edit Qualification
              </Button>
            </div>
          {/* )} */}
        </CardContent>
      </Card>
    </div>
  );
}
