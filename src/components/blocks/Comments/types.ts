import { StaticImageData } from "next/image";
import { Qualification, Publication } from "../../types/profile";

export interface CommentFlag {
  flag: "like" | "dislike";
  user: string | null;
  id: string;
}

export interface Comment {
  id: string;
  user: {
    name: string;
    avatar: StaticImageData | string;
  };
  time: string;
  text: string;
  likes: number;
  replies: number;
  created_at?: string;
  content?: string;
  author_name?: string;
  author_qualifications?: Qualification[];
  author_profile_pic?: string;
  is_liked?: boolean;
  user_avatar?: string;
  user_name?: string;
  submit_date?: string;
  comment?: string;
  flags?: CommentFlag[];
}

export interface CommentFilters {
  page: number;
  page_size: number;
}

export interface CommentsSectionProps {
  comments: Comment[];
  totalCount?: number;
  currentUserId?: string;
  onSubmitComment?: (comment: string) => void;
  onLike?: (comment: Comment, action: "like" | "dislike") => void;
  onReply?: (id: string) => void;
  sortOptions?: string[];
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  run?: boolean;
  setRun?: (value: boolean) => void;
  publication?: Publication;
  filters?: CommentFilters;
  setFilters?: (filters: CommentFilters) => void;
}
