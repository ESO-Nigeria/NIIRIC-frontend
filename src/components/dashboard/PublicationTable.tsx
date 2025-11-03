"use client";

// import React, { useMemo, useState } from "react";
import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreVertical, Search, Funnel } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/blocks/EmptyState";
import PaginationControls from "@/components/common/Pagination";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useGetUserPublicationsQuery } from "@/store/features/publications/actions";
import { useDeletePublicationMutation } from "@/store/features/publications/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export interface Publication {
  id: string;
  title: string;
  publication_type: string[];
  sectors: { id: string; name: string }[];
  status: string;
}

// Same pattern as Opportunities page
const defaultFilters = {
  ordering: "",
  page_size: 3,
};

const PublicationTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatusValue] = useState("all");
  const [filters, setFilters] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

  
  const queryParams = useMemo(
    () => ({
      ...filters,
      page: currentPage,
      search: searchValue,
      status: statusValue !== "all" ? statusValue : "",
    }),
    [filters, currentPage, searchValue, statusValue]
  );

  const { data, isLoading, error, refetch } = useGetUserPublicationsQuery(queryParams);
  const [deletePublication, { isLoading: isDeleting }] = useDeletePublicationMutation();



  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusValue(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: typeof defaultFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleFilterReset = () => {
    setFilters(defaultFilters);
    setCurrentPage(1);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await deletePublication(id).unwrap();
      toast.success("Publication deleted successfully");
      refetch(); //  refresh the list
    } catch (error: any) {
      toast.error("Failed to delete publication");
      console.error(error);
    }
};


  // Helpers
  const statusClass = (status: string) => {
    switch (status) {
      case "published":
        return "text-green-700 bg-green-100";
      case "draft":
        return "text-gray-600 bg-gray-100";
      case "pending":
        return "text-yellow-700 bg-yellow-100";
      default:
        return "text-gray-700 bg-gray-50";
    }
  };

  const publications = data?.results || [];

  return (
    <div className="w-full mx-auto py-8">
      <Tabs value={statusValue} onValueChange={handleStatusChange} className="w-full">
        <TabsList className={cn("flex gap-1 bg-transparent mb-0")}>
          <TabsTrigger
            value="all"
            className="rounded-t-lg p-10 bg-gray-100 text-sm font-medium data-[state=active]:bg-primary-green data-[state=active]:text-white! transition-all"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="published"
            className="rounded-t-lg p-10 bg-gray-100 text-sm font-medium data-[state=active]:bg-primary-green data-[state=active]:text-white! transition-all"
          >
            Published
          </TabsTrigger>
          <TabsTrigger
            value="draft"
            className="rounded-t-lg p-10 bg-gray-100 text-sm font-medium data-[state=active]:bg-primary-green data-[state=active]:text-white! transition-all"
          >
            Draft
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="rounded-t-lg p-10 bg-gray-100 text-sm font-medium data-[state=active]:bg-primary-green data-[state=active]:text-white! transition-all"
          >
            Pending
          </TabsTrigger>
        </TabsList>

        <TabsContent value={statusValue}>
          {isLoading && <Skeleton className="h-44 w-full" />}

          {!isLoading && publications.length === 0 && (
            <EmptyState
              title="No Publications Found"
              description="You haven't created any publications yet. Try adjusting your filters or create a new one."
            />
          )}

          {!isLoading && publications.length > 0 && (
            <Card className="shadow-sm border-none rounded-none">
              <div className="flex items-center px-4 py-3">
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search publications..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="w-full border border-gray-300 rounded-md py-3 pl-9 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary-green"
                  />
                </div>

                <Button className="border shadow-none hover:bg-transparent text-gray-800 bg-transparent ml-2">
                  <Funnel className="text-gray-800 w-4 h-4" />
                  Filter
                </Button>
              </div>

              <CardContent className="overflow-x-auto p-0">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-t">
                      <th className="p-3 font-medium text-gray-700">Title</th>
                      <th className="p-3 font-medium text-gray-700">Type</th>
                      <th className="p-3 font-medium text-gray-700">Sector</th>
                      <th className="p-3 font-medium text-gray-700">Status</th>
                      <th className="p-3 font-medium text-gray-700 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {publications.map((pub: Publication) => (
                      <tr
                        key={pub.id}
                        className="hover:bg-gray-50 transition-colors border-b last:border-0"
                      >
                        <td className="p-3 font-medium text-gray-900 flex capitalize items-center">
                          <Checkbox id={`pub-${pub.id}`} className="mr-2" />
                          {pub.title}
                        </td>
                        <td className="p-3 text-gray-700">
                          {Array.isArray(pub.publication_type)
                            ? pub.publication_type.join(", ")
                            : pub.publication_type}
                        </td>
                        <td className="p-3 text-gray-700">
                          {Array.isArray(pub.sectors)
                            ? pub.sectors.map((s) => s.name).join(", ")
                            : pub.sectors}
                        </td>
                        <td className="p-3">
                          <span
                            className={cn(
                              "px-2 py-1 text-xs rounded-full font-medium capitalize",
                              statusClass(pub.status)
                            )}
                          >
                            {pub.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="text-gray-500 hover:text-gray-800">
                                <MoreVertical className="w-5 h-5" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32">
                              <DropdownMenuItem asChild>
                                <Link href={`/resources/publications/${pub.id}`} className="w-full">
                                  Preview
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={{
                                    pathname: "/dashboard/publications/upload",
                                    query: { id: pub.id },
                                  }}
                                  className="w-full"
                                >
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(pub.id, pub.title)}
                                className="text-red-600 focus:text-red-700"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </CardContent>

              <div className="my-8 *:flex justify-center">
                <PaginationControls
                  currentPage={currentPage}
                  totalCount={data?.count || 0}
                  pageSize={filters.page_size || 0}
                  onPageChange={setCurrentPage}
                />
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PublicationTable;
