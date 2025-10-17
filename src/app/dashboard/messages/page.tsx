"use client";

import Breadcrumbs from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MessageTab from "@/components/common/MessageTab";
import { Search, Plus } from "lucide-react"; 



export default function Messages() {

	return (
		<DashboardLayout>
			<div className="pb-2">
				<Breadcrumbs />
			</div>
			<div className="space-y-4 font-dm_sans">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-normal font-poppins">Messages</h2>
					<Button>
						 Send Message
					</Button>
				</div>
				<MessageTab />
				
			</div>
			 <div className="grid grid-cols-2 gap-4 pt-4">
				<div>
					<Card>
						<CardHeader>
							   <div className="flex gap-2">
									<Button variant="outline" className="px-4 py-2 text-sm w-full py-5">
									All
									</Button>
									<Button variant="outline" className="px-4 py-2 text-sm w-full py-5">
									Unread
									</Button>
								</div>
							<div className="flex  gap-2">
								<div className="relative w-full">
								{/* Left: Search icon */}
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
									<Input
										type="text"
										placeholder="Search messages..."
										className="pl-10 pr-12"
									/>
								</div>
									{/* Right: Plus button inside input */}
									<Button
										size="icon"
										className="h-8 w-8 rounded-md"
									>
										<Plus className="w-4 h-4" />
									</Button>
							</div>
						</CardHeader>
					</Card>
				</div>
			<div>Column 2</div>
			</div>

		</DashboardLayout>
	);
}
