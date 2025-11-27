"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings,
  Sidebar,
  SidebarClose,
} from "lucide-react";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import { RootState } from "@/store";
import { cn } from "@/lib/utils";
import {
  useGetUserProfileQuery,
  useGetUserQualificationsQuery,
} from "@/store/features/auth/actions";
import { setPublisherProfile } from "@/store/features/auth/auth.slice";

import DashBoardHeader from "../blocks/header/dashboardHeader";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Publications", href: "/dashboard/publications", icon: FileText },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { data: userProfile, isLoading } = useGetUserProfileQuery({});
  const { data: userQualifications } = useGetUserQualificationsQuery({});

  useEffect(() => {
    if (userProfile?.length > 0) {
      dispatch(setPublisherProfile(userProfile));
    }
  }, [userProfile, dispatch]);

  const isDisabledCheck = (itemLabel: string) => {
    return (
      userProfile?.length == 0 ||
      (userQualifications?.results?.length == 0 &&
        itemLabel !== "Dashboard")
    );
  };

  const SidebarContent = () => (
    <nav className="flex flex-col gap-3 mt-6">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const isDisabled = isDisabledCheck(item.label);

        return (
          <div
            key={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition",
              isActive
                ? "bg-primary-green text-white"
                : "text-gray-700 hover:bg-primary-green/15 hover:text-primary-green",
              isDisabled &&
                "opacity-50 cursor-not-allowed hover:bg-white hover:text-gray-500"
            )}
          >
            {isDisabled ? (
              <>
                <item.icon className="h-5 w-5 text-gray-400" />
                <span>{item.label}</span>
              </>
            ) : (
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 w-full"
              >
                <item.icon
                  className={cn("h-5 w-5", {
                    "text-white": isActive,
                    "text-gray-600": !isActive,
                  })}
                />
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <DashBoardHeader userProfile={userProfile} />

      {/* MOBILE SIDEBAR (ONLY change added) */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="fixed top-20 left-4 z-50 bg-primary-green text-white p-2 rounded-md">
            {open ? <SidebarClose size={20} /> : <Sidebar size={20} />}
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-4">
            <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-1">
        {/* DESKTOP SIDEBAR (unchanged) */}
        <aside className="hidden md:block w-64 bg-white border-r px-4 py-6">
          <SidebarContent />
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
