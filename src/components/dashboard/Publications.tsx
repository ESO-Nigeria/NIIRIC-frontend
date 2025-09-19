"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowUp, ArrowRight } from "lucide-react";

export function Publications() {
  const stats = [
    { label: "All", value: 0, icon: Calendar, color: '' },
    { label: "Published", value: 0, icon: ArrowUp },
    { label: "Pending Approval", value: 0, icon: ArrowRight },
  ];

  return (
    <div className="space-y-4 font-dm_sans">
      <h2 className="text-xl font-normal font-poppins">Publications</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-none border-none">
            <CardContent className="flex gap-4 items-center ">
              <span className="bg-[#FEF0C7] text-[#DC6803] p-2 size-8 rounded-lg flex items-center justify-center">
                <stat.icon className="h-6 w-6 " />
              </span>
              
              <div className="flex gap-3 flex-col ">
            <span className="text-base text-[#667085] font-medium">{stat.label}</span>
              <span className="text-base text-[#3F434A] font-medium">{stat.value}</span>
              </div>
              
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
