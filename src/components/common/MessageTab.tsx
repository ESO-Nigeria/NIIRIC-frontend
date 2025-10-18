"use client";

import {
  ArrowUp,
  BookTextIcon,
  MessageSquare
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";



export default function PublicationsTab() {
  
  const stats = [
  {
    label: "All",
    value: 0,
    icon: MessageSquare,
    color: "text-[#12B76A] bg-[#A6F4C5]/20 ",
  },
  {
    label: "Unread",
    value: 0,
    icon: ArrowUp,
    color: "text-[#12B76A] bg-[#A6F4C5]/20",
  },
  {
    label: "Archive",
    value: 0,
    icon: ArrowUp,
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
