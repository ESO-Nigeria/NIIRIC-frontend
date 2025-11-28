"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import GeneralLayout from "@/layouts/General";
import Breadcrumbs from "@/components/common/Breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import BlogCard from "@/components/blocks/BlogCard";

import {
  useGetBlogByIdQuery,
  useGetBlogsQuery,
} from "@/store/features/blogs/actions";

// Minimal type for BlogCard
export interface BlogCardItemType {
  id: string;
  title: string;
  brief_info: string;
  category?: string;
  blog_image?: string | null;
  date?: string;
}

// Full type
export interface BlogItemType extends BlogCardItemType {
  full_info: string;
  author_name: string;
  blog_video?: string | null;
}

export default function BlogDetailPage() {
  const { id } = useParams();

  // Fetch blog detail
  const {
    data: blog,
    isLoading,
    isError,
  } = useGetBlogByIdQuery(id as string);

  // Fetch all blogs for "related"
  const { data: allBlogs } = useGetBlogsQuery({});

  const related =
    allBlogs?.results
      ?.filter((b: any) => b.id !== id)
      .slice(0, 3) ?? [];

  const [selectedBlog, setSelectedBlog] = useState<BlogItemType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePlusClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: BlogCardItemType
  ) => {
    e.stopPropagation();
    const full = allBlogs?.results?.find((b: any) => b.id === item.id) || null;
    setSelectedBlog(full);
    setDialogOpen(true);
  };

  if (isError) {
    return (
      <div className="p-10 text-center text-gray-500 text-xl font-semibold">
        Failed to load blog.
      </div>
    );
  }

  if (!blog && !isLoading) {
    return (
      <div className="p-10 text-center text-gray-500 text-xl font-semibold">
        Blog not found.
      </div>
    );
  }

  return (
    <GeneralLayout>
      <div className="pt-8 lg:pt-16 px-16">
        <Breadcrumbs dynamicLabels={{ [id as string]: blog?.title }} />
      </div>

      <div className="p-8 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT SECTION */}
          {isLoading && (
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-10 w-3/4 rounded-md" />
              <Skeleton className="h-[400px] w-full rounded-xl" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-10/12" />
                <Skeleton className="h-4 w-9/12" />
              </div>
            </div>
          )}

          {blog && (
            <main className="lg:col-span-2 space-y-6">
              <h1 className="text-3xl font-bold text-primary-green leading-tight">
                {blog.title}
              </h1>

              <p className="text-gray-500 text-sm">
                {new Date(blog.date).toDateString()} — {blog.author_name}
              </p>

              {blog.blog_image_url && (
                <img
                  src={blog.blog_image_url}
                  alt={blog.title}
                  className="rounded-xl w-full object-cover shadow-lg"
                />
              )}

              <div
                className="text-gray-700 text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.full_info }}
              ></div>

              {blog.blog_video_url && (
                <video
                  className="w-full rounded-xl mt-4"
                  controls
                  src={blog.blog_video_url}
                />
              )}
            </main>
          )}

          {/* RIGHT SECTION — Related Blogs */}
          <aside className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-normal font-poppins">Related Blogs</h3>

            <div className="flex flex-col gap-4">
              {related.length > 0 ? (
                related.map((item: any) => (
                  <BlogCard
                    key={item.id}
                    item={{
                      id: item.id,
                      title: item.title,
                      brief_info: item.brief_info,
                      category: item.category,
                      blog_image: item.blog_image_url,
                      date: item.date,
                    }}
                  />
                ))
              ) : (
                <p className="text-gray-500">No related blogs found.</p>
              )}
            </div>
          </aside>
        </div>
      </div>

    </GeneralLayout>
  );
}
