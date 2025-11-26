import { MessageSquare, MessageSquareTextIcon } from "lucide-react";
import { Button } from "../../ui/button";

interface EmptyCommentsProps {
  onAddComment: () => void;
}

export function EmptyComments({ onAddComment }: EmptyCommentsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <MessageSquare className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No comments yet
      </h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">
        Be the first to share your thoughts on this publication
      </p>
      <Button
        variant="primary-green"
        onClick={onAddComment}
        className="flex items-center gap-2"
      >
        <MessageSquareTextIcon className="w-4 h-4" />
        Add the first comment
      </Button>
    </div>
  );
}
