'use client'
import React, { ReactNode } from "react";
import Breadcrumbs from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { selectCurrentUser } from "@/store/features/auth/selectors";
import { useSelector } from "react-redux";

const layout = ({ children }: { children: ReactNode }) => {
	const user = useSelector(selectCurrentUser);
	return (
		<DashboardLayout>
			<div className="mb-3">
				<Breadcrumbs />
			</div>
			{user && <h1 className="text-[28px] capitalize font-poppins text-[#242424] font-normal mb-3">
				Hi, {user?.first_name}
			</h1> }
			
			<div className="flex items-center justify-between mb-3">
				<h2 className="text-[28px] font-poppins font-medium">
					Your NIIRIC Profile Journey
				</h2>
				{/* <Progress value={16} className="w-40" /> */}
			</div>
			<div>{children}</div>
		</DashboardLayout>
	);
};

export default layout;
