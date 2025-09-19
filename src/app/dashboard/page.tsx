import DashboardLayout from "@/components/layouts/DashboardLayout";
import { ProfileJourney } from "@/components/dashboard/ProfileJourney";
import { Publications } from "@/components/dashboard/Publications";
import Breadcrumbs from "@/components/common/Breadcrumb";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="pb-2">
        <Breadcrumbs />
      </div>
      <h1 className="text-[28px] font-poppins text-[#242424] font-normal mb-6">Hi, Amaka</h1>
      <ProfileJourney />
      <Publications />
    </DashboardLayout>
  );
}
