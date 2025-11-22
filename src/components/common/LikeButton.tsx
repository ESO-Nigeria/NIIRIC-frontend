import { BiSolidLike } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useLikeOrUnlikePublicationMutation } from "@/store/features/publications/actions";

export function LikeButton({ id, is_liked, like_count, onLike }: {id: string, is_liked?: string, like_count?: string, onLike?: () => void  }) {
  const [likeOrUnlikePublication, { isLoading }] = useLikeOrUnlikePublicationMutation();

  const handleLikeToggle = async () => {
    const action = is_liked ? "unlike" : "like";
    try {
      await likeOrUnlikePublication({ id: id, action }).unwrap();
      onLike?.()
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };
  return (
    <Button
      variant="ghost"
      disabled={isLoading}
      onClick={handleLikeToggle}
      className={`flex items-center gap-1 text-gray-500 bg-transparent group hover:bg-green-50 transition ${
        is_liked ? "bg-green-100 text-green-600" : ""
      }`}
    >
      <BiSolidLike
        className={`w-4 h-4 transition ${
         is_liked
            ? "text-green-600 group-hover:text-green-700"
            : "text-gray-400 group-hover:text-green-500"
        }`}
      />
      <span className="text-sm">{like_count}</span>
    </Button>
  );
}
