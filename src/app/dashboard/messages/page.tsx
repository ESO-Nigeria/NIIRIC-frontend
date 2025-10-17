"use client";

import Breadcrumbs from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MessageTab from "@/components/common/MessageTab";
import { Search, Plus, ChevronDown } from "lucide-react";
import RichTextEditor from "@/components/common/RichTextEditor";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";

export default function Messages() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      abstract: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Message Data:", data);
    // TODO: integrate message sending logic here
  };

  return (
    <DashboardLayout>
      <div className="pb-2">
        <Breadcrumbs />
      </div>

      <div className="space-y-4 font-dm_sans">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-normal font-poppins">Messages</h2>
          <Button variant="primary-green" className="h-11 px-3">
            Send Message
          </Button>
        </div>

        <MessageTab />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {/* Left Column */}
          <div>
            <Card className="border-none h-screen">
              <CardHeader>
                {/* Filter Buttons */}
                <div className="flex gap-4 w-full overflow-hidden mb-2">
                  <Button variant="outline" className="flex-1 rounded-md bg-green-50 text-green-700 border-green-700">
                    All
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-md">
                    Unread
                  </Button>
                </div>

                {/* Search and Add */}
                <div className="flex items-center gap-2">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search messages..."
                      className="pl-10 py-6 pr-3"
                    />
                  </div>
                  <Button variant="primary-green" size="icon" className="h-12 w-12">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-4 text-gray-400 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[18px] font-dm_sans font-medium">
                    You do not have any messages
                  </p>
                  <Link
                    href="/research"
                    className="h-11 px-3 text-green-700 text-[14px] font-dm_sans font-medium"
                    onClick={() => {
                      window.location.href = "/dashboard/publications/upload";
                    }}
                  >
                    Send messages to other Researchers
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card className="border-none h-fit w-full">
                <CardHeader>
                  <h2 className="text-xl font-normal font-poppins mb-3">Send Message</h2>
                  <h3 className="text-[16px] font-normal font-poppins mb-4">Find Researchers</h3>

                  {/* Search with icons */}
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search researchers..."
                      className="pl-10 pr-10 py-6"
                    />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" />
                  </div>
                </CardHeader>

                <CardContent className="p-4 text-gray-400 flex items-center justify-center border-b md:h-[450px]">
                  No researchers found
                </CardContent>

                {/* Rich Text Message Input */}
                <CardContent className="p-4">
                  <div className="border rounded-md overflow-hidden">
                    <Controller
                      name="abstract"
                      control={control}
                      render={({ field }) => (
                        <RichTextEditor
                          value={field.value || ""}
                          onChange={field.onChange}
						  
                        />
                      )}
                    />
                  </div>
                </CardContent>

                {/* Send Button */}
                <CardFooter className="flex justify-end">
                  <Button
                    variant="primary-green"
                    size="lg"
                    type="submit"
                    className="text-[14px] font-dm_sans font-medium"
                  >
                    Send
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
