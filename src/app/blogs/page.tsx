"use client";

import { useState, useMemo } from "react";
import InfoHero from "@/components/blocks/infoHero";
import GeneralLayout from "@/layouts/General";
import BlogCard from "@/components/blocks/BlogCard";
import Pagination from "@/components/blocks/Pagination";
import { useGetBlogsQuery } from "@/store/features/blogs/actions";

export interface BlogCardItemType {
  id: string;
  title: string;
  brief_info: string;
  category?: string;
  blog_image?: string | null;
  date?: string;
}

export interface BlogItemType extends BlogCardItemType {
  full_info: string;
  author_name: string;
  blog_video?: string | null;
}

interface BlogsProps {
  defaultFilter?: "recent" | "published" | "all";
}

export default function Blogs({ defaultFilter = "all" }: BlogsProps) {
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [sortOrder, setSortOrder] = useState<"newer" | "older">("newer");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  // Fetch Blogs
  const { data, isLoading, error } = useGetBlogsQuery(undefined);

  // Normalize API data
  const blogs: BlogItemType[] = Array.isArray(data)
    ? data
    : data?.results || [];

  // Filter + Sort
  const filteredAndSortedBlogs = useMemo(() => {
    return blogs
      .filter((blog) => {
        const matchesSearch =
          blog.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
          blog.brief_info?.toLowerCase().includes(searchValue.toLowerCase());

        const matchesCategory = categoryValue
          ? blog.category?.toLowerCase() === categoryValue.toLowerCase()
          : true;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return sortOrder === "newer" ? dateB - dateA : dateA - dateB;
      });
  }, [blogs, searchValue, categoryValue, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedBlogs.length / itemsPerPage);
  const currentBlogs = filteredAndSortedBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <GeneralLayout>
      <InfoHero
        tag="Blogs"
        title="Latest Blogs"
        description="Explore insights, stories, and expert articles from across the NIIRIC community."
        imageUrl="/assets/images/blogs_hero.jpg"
        imageAlt="Blogs Banner Image"
        showSearch={true}
        searchValue={searchValue}
        placeholderText="Search for blogs"
        onSearchValueChange={setSearchValue}
        categoryValue={categoryValue}
        onCategoryChange={setCategoryValue}
        onSearch={() => {}}
      />

      {/* Header + Sort */}
      <div className="mx-auto container px-4 flex items-center justify-between mt-10">
        <h2 className="text-xl font-normal font-poppins">Latest Blogs</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "newer" | "older")}
            className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none"
          >
            <option value="newer">Newest</option>
            <option value="older">Oldest</option>
          </select>
        </div>
      </div>

      {/* Blogs Grid */}
      <section className="mx-auto container px-4 py-10">
        {isLoading ? (
          <p className="text-center text-gray-500 py-10">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-10">
            Failed to load blogs.
          </p>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentBlogs.map((item) => (
              <BlogCard
                key={item.id}
                item={{
                  id: item.id,
                  title: item.title,
                  brief_info: item.brief_info,
                  category: item.category,
                  blog_image: item.blog_image,
                  date: item.date,
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">No blogs found.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>
    </GeneralLayout>
  );
}
