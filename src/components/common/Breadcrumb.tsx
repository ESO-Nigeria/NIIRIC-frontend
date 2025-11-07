"use client";

import { ChevronsRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface CustomBreadcrumbItem {
  label?: string;
  href?: string;
  hide?: boolean;
}

interface ExtraBreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  customItems?: Record<string, CustomBreadcrumbItem>;
  extraItems?: ExtraBreadcrumbItem[];
  dynamicLabels?: Record<string, string>; // for replacing [id] or dynamic params
}

export default function Breadcrumbs({
  customItems = {},
  extraItems = [],
  dynamicLabels = {},
}: BreadcrumbsProps) {
  const pathname = usePathname();

  // Split URL path into segments
  const segments = pathname.split("/").filter(Boolean);

  // Build dynamic breadcrumb items
  const dynamicItems = segments
    .map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const isLast = index === segments.length - 1;

      // Handle dynamic route like [id] or actual id (e.g., users/12345)
      const isDynamicParam = segment.match(/^\[.*\]$/);
      const isNumericOrId = /^[0-9a-fA-F-]+$/.test(segment); // handles uuid or numeric ids

      let label = segment;

      // Priority order: custom label > dynamicLabels replacement > detect id
      if (customItems[segment]?.label) {
        label = customItems[segment].label!;
      } else if (dynamicLabels[segment]) {
        label = dynamicLabels[segment];
      } else if (isDynamicParam) {
        label = segment.replace(/[\[\]]/g, "").replace(/-/g, " ");
      } else if (isNumericOrId) {
        label = dynamicLabels[segment] || "Details";
      } else {
        label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
      }

      const custom = customItems[segment] || {};
      if (custom.hide) return null;

      return {
        label,
        href: custom.href || href,
        isLast,
      };
    })
    .filter(Boolean) as { label: string; href: string; isLast: boolean }[];

  // Merge manual + generated items
  const allItems = [
    ...extraItems.map((i) => ({ ...i, isLast: false })),
    ...dynamicItems,
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {allItems.map((item, index) => (
          <div key={item.href || item.label} className="flex items-center gap-x-3.5">
            <BreadcrumbSeparator>
              <ChevronsRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {item.isLast  ? (
                <BreadcrumbPage className="text-[#667085] capitalize">{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href="#" className="text-[#667085] capitalize" >
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
