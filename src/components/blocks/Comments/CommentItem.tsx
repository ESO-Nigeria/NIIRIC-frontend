import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Comment } from "./types";
import clsx from "clsx";
import { useMemo } from "react";

interface CommentItemProps {
  comment: Comment;
  onLike?: (comment: Comment, action: "like" | "dislike") => void;
  currentUserId?: string;
  isLiking?: boolean;
}

export function CommentItem({
  comment,
  onLike,
  currentUserId,
  isLiking = false,
}: CommentItemProps) {
  // Calculate likes and dislikes from flags array
  const { likesCount, dislikesCount, userLiked, userDisliked } = useMemo(() => {
    if (!comment.flags || comment.flags.length === 0) {
      return {
        likesCount: comment.likes || 0,
        dislikesCount: comment.replies || 0,
        userLiked: false,
        userDisliked: false,
      };
    }

    const likes = comment.flags.filter((flag) => flag.flag === "like");
    const dislikes = comment.flags.filter((flag) => flag.flag === "dislike");

    const userLiked = currentUserId
      ? likes.some((flag) => flag.id === currentUserId)
      : false;
    const userDisliked = currentUserId
      ? dislikes.some((flag) => flag.id === currentUserId)
      : false;

    return {
      likesCount: likes.length,
      dislikesCount: dislikes.length,
      userLiked,
      userDisliked,
    };
  }, [comment.flags, comment.likes, comment.replies, currentUserId]);

  return (
    <div className="flex flex-col gap-2">
      {/* Avatar & User Info */}
      <div className="flex items-start gap-3">
        <Avatar className="size-10">
          <AvatarImage
            src={comment?.user_avatar || comment?.author_profile_pic}
            alt={comment?.user_name || comment?.author_name || "User"}
          />
          <AvatarFallback>
            {(comment?.user_name || comment?.author_name || "U")
              .charAt(0)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 text-sm">
          <span className="font-normal text-primary-green tracking-tight leading-none">
            {comment?.user_name || comment?.author_name}
          </span>
          {comment?.author_qualifications &&
            comment.author_qualifications.length > 0 && (
              <p className="text-sm text-[#667085] capitalize">
                {comment.author_qualifications
                  .map((item) => item?.position_display)
                  .filter(Boolean)
                  .join(", ")}
              </p>
            )}
          <span className="leading-none text-xs text-muted-foreground">
            {comment?.submit_date || comment?.time}
          </span>
        </div>
      </div>

      {/* Comment Body */}
      <div className="flex-1 space-y-1">
        <p className="text-gray-700 font-light text-sm">
          {comment?.comment || comment?.content || comment?.text}
        </p>

        {/* Like/Dislike Actions */}
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <Button
            variant="ghost"
            size="sm"
            className={clsx(
              "flex items-center gap-1",
              userLiked ? "text-green-600" : "hover:text-green-600"
            )}
            onClick={() => onLike?.(comment, "like")}
            disabled={isLiking}
          >
            <ThumbsUp
              className={clsx("w-4 h-4", userLiked && "fill-green-600")}
            />
            {likesCount}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={clsx(
              "flex items-center gap-1",
              userDisliked ? "text-red-600" : "hover:text-red-600"
            )}
            onClick={() => onLike?.(comment, "dislike")}
            disabled={isLiking}
          >
            <ThumbsDown
              className={clsx("w-4 h-4", userDisliked && "fill-red-600")}
            />
            {dislikesCount}
          </Button>
        </div>
      </div>
    </div>
  );
}
