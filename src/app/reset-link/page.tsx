"use client";

import Header02 from "@/components/blocks/header";
import { Button } from "@/components/ui/button";

const ResetLink = () => {
	return (
		<div>
			<Header02 />
			<div className="min-h-[80vh] flex items-center justify-center">
				<div className="w-full flex items-center justify-center h-full p-4">
					<div className="max-w-lg m-auto space-y-4 w-full flex flex-col items-center">
						<h4 className="text-[28px] font-bold">Resent Link Sent</h4>
						<div className="bg-[#F6FEF9] px-6 py-3  space-y-4 rounded-2xl text-center w-full">
							<h4 className="text-[#039855] text-[28px] font-bold">
								Successful
							</h4>
							<p className=" text-base font-normal tracking-tight">
								We have sent a reset link to your email address <br />{" "}
								chi**@**.com
							</p>
						</div>
						<Button variant={"primary-green"} className="mt-4 h-11 w-full">
							Continue
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResetLink;
