"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ----------------------
// Minimal type for Card
// ----------------------
export interface BlogCardItemType {
  id: string;
  title: string;
  brief_info: string;
  category?: string;
  blog_image?: string | null;
  date?: string;
}

// Props
interface BlogCardProps {
  item: BlogCardItemType;
}

// BLOG CARD COMPONENT
const BlogCard: React.FC<BlogCardProps> = ({ item }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden bg-white  transition-all duration-300">

      {/* Blog Image */}
      <div className="relative">
        {item.blog_image ? (
          <img
            src={item.blog_image}
            alt={item.title}
            className="h-48 w-full object-cover"
          />
        ) : (
          <div className="h-48 w-full bg-gray-200"></div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-gray-600 uppercase">{item.category}</p>

        <Link
          href={`/blogs/${item.id}`}
          className="font-semibold text-lg text-primary-green"
        >
          {item.title}
        </Link>

        <p className="text-sm text-gray-700 line-clamp-3">
          {item.brief_info}
        </p>

        {/* View Details Button */}
        <Link
          href={`/blogs/${item.id}`}
          className="flex items-center gap-2 text-primary-green font-medium hover:underline text-sm"
        >
          View Details
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
      
    </div>
  );
};

export default BlogCard;
