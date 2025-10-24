"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import {Search} from "lucide-react";

const publications = [
  {
    id: 1,
    title: "AI and the Future",
    type: "Journal Article",
    sector: "Technology",
    status: "published",
    date: "2025-08-15",
  },
  {
    id: 2,
    title: "Learning Robotics",
    type: "Research Paper",
    sector: "Education",
    status: "draft",
    date: "2025-07-10",
  },
  {
    id: 3,
    title: "Sustainable Tech in Africa",
    type: "Policy Report",
    sector: "Environment",
    status: "pending",
    date: "2025-09-01",
  },
  {
    id: 4,
    title: "Innovating with Django",
    type: "Technical Paper",
    sector: "Software",
    status: "published",
    date: "2025-06-02",
  },
  {
    id: 5,
    title: "Deep Learning in Nigeria",
    type: "Conference Paper",
    sector: "AI",
    status: "published",
    date: "2025-07-22",
  },
  {
    id: 6,
    title: "The Rise of STEM Education",
    type: "Educational Paper",
    sector: "Education",
    status: "draft",
    date: "2025-08-01",
  },
  {
    id: 7,
    title: "Climate Tech Innovations",
    type: "Report",
    sector: "Environment",
    status: "pending",
    date: "2025-09-10",
  },
  {
    id: 8,
    title: "Next.js for Researchers",
    type: "Technical Paper",
    sector: "Software",
    status: "published",
    date: "2025-07-12",
  },
];

const ITEMS_PER_PAGE = 3;

const PublicationTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filterPublications = (status: string) => {
    let filteredList = publications;

    if (status !== "all") {
      filteredList = filteredList.filter((p) => p.status === status);
    }

    if (searchTerm.trim()) {
      filteredList = filteredList.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredList;
  };

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

  const renderTable = (status: string) => {
    const filtered = filterPublications(status);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const displayed = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    if (displayed.length === 0)
      return (
        <Card className="shadow-sm rounded-none">
          <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary-green"
              />
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-gray-600 text-sm mb-4">
              You have not created any Publication
            </p>
            <button className="bg-primary-green text-white px-4 py-2 text-sm rounded-md hover:bg-green-700 transition">
              Create Post
            </button>
          </div>
        </Card>
      );

    return (
      <Card className="shadow-sm rounded-none">
        {/* Search Bar */}
        <div className="flex justify-between items-center px-4 py-3 ">
        
        <div className="relative w-full max-w-xs">
        {/* Search Icon */}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

        {/* Input Field */}
        <input
            type="text"
            placeholder="Search publications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 pl-9 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary-green"
        />

        {/* Clear Button */}
        <button
            onClick={() => setSearchTerm("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
            ✕
        </button>
        </div>
        </div>

        <CardContent className="overflow-x-auto p-0">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b border-t">
                <th className="p-3 font-medium text-gray-700">
                  Publication Title
                </th>
                <th className="p-3 font-medium text-gray-700">Type</th>
                <th className="p-3 font-medium text-gray-700">Sector</th>
                <th className="p-3 font-medium text-gray-700">Status</th>
                <th className="p-3 font-medium text-gray-700 text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {displayed.map((pub) => (
                <tr
                  key={pub.id}
                  className="hover:bg-gray-50 transition-colors border-b last:border-0"
                >
                  <td className="p-3 font-medium text-gray-900">
                    <Checkbox
                      id={`pub-${pub.id}`}
                      className="mr-2"
                    />
                    {pub.title}
                  </td>
                  <td className="p-3 text-gray-700">{pub.type}</td>
                  <td className="p-3 text-gray-700">{pub.sector}</td>
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
                    <button className="text-gray-500 hover:text-gray-800">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>

        {/* Pagination */}
        <div className="flex justify-between items-center border-t px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Showing</span>

            <select
              className="border rounded-md text-sm p-1"
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
            >
              {[...Array(totalPages)].map((_, i) => (
                <option key={i} value={i + 1}>
                  Page {i + 1}
                </option>
              ))}
            </select>
            <span>of</span>
            <span>{filtered.length}</span>
          </div>

          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((p) => Math.max(1, p - 1));
                  }}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {totalPages > 3 && <PaginationEllipsis />}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    );
  };

  return (
    <div className="w-full mx-auto py-8">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className={cn("flex gap-1 bg-transparent mb-0")}>
          <TabsTrigger
            value="all"
            className="rounded-t-lg p-10 bg-gray-100 text-sm font-medium data-[state=active]:bg-primary-green data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="published"
            className="rounded-t-lg p-10 bg-gray-100 text-sm font-medium data-[state=active]:bg-primary-green data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
          >
            Published
          </TabsTrigger>
          <TabsTrigger
            value="draft"
            className="rounded-t-lg p-10 bg-gray-100 text-sm font-medium data-[state=active]:bg-primary-green data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
          >
            Draft
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="rounded-t-lg p-10 bg-gray-100 text-sm font-medium data-[state=active]:bg-primary-green data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
          >
            Pending Approval
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderTable("all")}</TabsContent>
        <TabsContent value="published">{renderTable("published")}</TabsContent>
        <TabsContent value="draft">{renderTable("draft")}</TabsContent>
        <TabsContent value="pending">{renderTable("pending")}</TabsContent>
      </Tabs>
    </div>
  );
};

export default PublicationTable;
