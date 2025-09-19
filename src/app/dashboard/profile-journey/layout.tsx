import Breadcrumbs from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import React, { ReactNode } from "react";

const layout = ({ children }: {children: ReactNode}) => {
  return (
    <DashboardLayout>
      <div className="mb-3">
        <Breadcrumbs />
      </div>
      <h1 className="text-[28px] font-poppins text-[#242424] font-normal mb-3">
        Hi, Amaka
      </h1>
      <div className="flex items-center justify-between mb-3">
          <h2 className="text-[28px] font-poppins font-medium">Your NIIRIC Profile Journey</h2>
          {/* <Progress value={16} className="w-40" /> */}
      </div>
      <div>
        {children}
      </div>
      
    </DashboardLayout>
  );
};

export default layout;
