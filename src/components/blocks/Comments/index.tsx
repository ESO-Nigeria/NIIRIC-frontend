"use client";

import { ChevronDown, MessageSquareTextIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PaginationControls from "../../common/Pagination";
import { CommentsSectionProps } from "./types";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";
import { EmptyComments } from "./EmptyComments";

export function CommentsSection({
  comments = [],
  totalCount = 0,
  onSubmitComment,
  onLike,
  sortOptions = ["Newest", "Oldest"],
  run,
  setRun,
  filters,
  setFilters,
  currentUserId,
}: CommentsSectionProps) {
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [isAdding, setIsAdding] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likingCommentId, setLikingCommentId] = useState<string | null>(null);

  const handleCancel = () => {
    setIsAdding(false);
    setNewComment("");
  };

  useEffect(() => {
    setNewComment("");
    setIsAdding(false);
  }, [run]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmitComment?.(newComment);
      setNewComment("");
      setIsAdding(false);
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasComments = comments && comments.length > 0;

  return (
    <div className="w-full bg-white rounded-lg border p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900 text-lg">
          {totalCount} {totalCount === 1 ? "Comment" : "Comments"}
        </h4>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setIsAdding(true)}
            disabled={isSubmitting}
          >
            <MessageSquareTextIcon className="w-4 h-4" /> Add Comment
          </Button>

          <div className="flex items-center gap-1">
            Sort by:{" "}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-800 hover:bg-gray-100"
            >
              {selectedSort} <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Add Comment Form */}
      {isAdding && (
        <CommentForm
          value={newComment}
          onChange={setNewComment}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Comments List or Empty State */}
      <div className="space-y-6">
        {!hasComments ? (
          <EmptyComments onAddComment={() => setIsAdding(true)} />
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onLike={async (comment, action) => {
                setLikingCommentId(comment.id);
                try {
                  await onLike?.(comment, action);
                } finally {
                  setLikingCommentId(null);
                }
              }}
              currentUserId={currentUserId}
              isLiking={likingCommentId === comment.id}
            />
          ))
        )}
      </div>

      {/* Footer with Add Comment Button and Pagination */}
      {hasComments && (
        <div className="flex justify-between items-center">
          <Button
            onClick={() => setIsAdding(true)}
            variant="primary-green"
            className="flex items-center gap-1"
            disabled={isSubmitting}
          >
            <MessageSquareTextIcon className="w-4 h-4" /> Add Comment
          </Button>

          {filters && setFilters && totalCount > (filters.page_size || 10) && (
            <div className="my-8">
              <PaginationControls
                currentPage={filters.page}
                totalCount={totalCount}
                pageSize={filters.page_size}
                onPageChange={(page: number) => {
                  setFilters({
                    ...filters,
                    page,
                  });
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
