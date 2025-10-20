"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

// Utility to build page range with ellipsis
function range(start: number, end: number) {
  const arr = [] as number[];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pagination = React.useMemo(() => {
    const totalNumbers = siblingCount * 2 + 5;
    if (totalPages <= totalNumbers) return range(1, totalPages);

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const shouldShowLeftEllipsis = leftSiblingIndex > 2;
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;
    const pages: (number | string)[] = [1];

    if (shouldShowLeftEllipsis) {
      pages.push("left-ellipsis");
    } else {
      pages.push(...range(2, leftSiblingIndex - 1));
    }

    pages.push(...range(leftSiblingIndex, rightSiblingIndex));

    if (shouldShowRightEllipsis) {
      pages.push("right-ellipsis");
    } else {
      pages.push(...range(rightSiblingIndex + 1, totalPages - 1));
    }

    pages.push(totalPages);
    return pages;
  }, [currentPage, totalPages, siblingCount]);

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <nav
      className={`flex items-center justify-center gap-2 ${className}`}
      aria-label="Pagination"
    >
      {/* Previous button */}
      <Button
        variant="outline"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex items-center gap-1 border border-gray-300 px-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Previous</span>
      </Button>

    <div className="mx-20 flex items-center justify-center gap-2">
              {/* Page numbers */}
      {pagination.map((p, idx) =>
        typeof p === "string" ? (
          <span key={p + idx} className="px-2 text-sm text-gray-400 select-none">
            …
          </span>
        ) : (
          <Button
            key={p}
            variant="outline"
            onClick={() => goTo(p)}
            aria-current={p === currentPage ? "page" : undefined}
            className={`min-w-[36px] h-9  ${
              p === currentPage
                ? "bg-[#D1AE6F40] text-black "
                : "hover:bg-[#D1AE6F20]"
            }`}
          >
            {p}
          </Button>
        )
      )}
    </div>

      {/* Next button */}
      <Button
        variant="outline"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex items-center gap-1 border border-gray-300 px-3"
      >
        <span>Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Button>
    </nav>
  );
}
