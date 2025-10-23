"use client";

import {
	ChevronDown,
	MessageSquare,
	MessageSquareTextIcon,
	ThumbsDown,
	ThumbsUp,
} from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCommentOnPublicationMutation } from "@/store/features/publications/actions";
import { Profile, Publication } from "../types/profile";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { toast } from "react-toastify";
import { format, formatDistanceToNow } from "date-fns";
import Pagination from "./Pagination";
import PaginationControls from "../common/Pagination";

interface Comment {
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
	content?: string
}

interface CommentsSectionProps {
	comments:{ results: Comment[]};
	totalCount?: number;
	onSubmitComment?: (comment: string) => void;
	onLike?: (id: string) => void;
	onReply?: (id: string) => void;
	sortOptions?: string[];
	totalPages?: number;
	currentPage?: number;
	onPageChange?: (page: number) => void;
	run?: any,
	setRun?: any,
	publication?: Publication,
	filters?: any,
	setFilters?: any
}

export function CommentsSection({
	comments,
	totalCount,
	onSubmitComment,
	onLike,
	onReply,
	sortOptions = ["Newest", "Oldest"],
	totalPages = 10,
	currentPage = 1,
	onPageChange,
	run,
	setRun,
	publication,
	filters, 
	setFilters
}: CommentsSectionProps) {
	const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
	const [isAdding, setIsAdding] = useState(false);
	const [newComment, setNewComment] = useState("");
	const [commentOnPublication, { isLoading, isSuccess, error }] = useCommentOnPublicationMutation()
	const publisher = useSelector((state: RootState) => state.auth.profile as Profile | null);

	const handleCancel = () => {
		setIsAdding(false);
		setNewComment("");
	};

	console.log('publication', publication, publisher)
	const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
		const data_to_send = {
			"content": newComment,
			"object_id": publication?.id,
			"author": publisher?.user,
			"content_type": 1
		}
    try {
			await commentOnPublication(data_to_send).unwrap(); // unwrap() throws if error
      setNewComment("");
			setRun(!run)
			toast.success('Comment Added')
    } catch (err) {
      alert("Failed to add comment");
    }
  };

	return (
		<div className="w-full bg-white rounded-lg border p-4 space-y-4">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h4 className="font-semibold text-gray-900 text-lg">
					{totalCount} Comments
				</h4>
				<div className="flex items-center gap-6 text-sm text-gray-600">
					<Button
						variant="ghost"
						size="sm"
						className="flex items-center gap-1 "
						onClick={() => setIsAdding(true)}
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

			{/* Add Comment Box */}
			{isAdding && (
				<div className="space-y-3 ">
					<label
						htmlFor="new-comment"
						className="block text-base font-normal text-gray-700"
					>
						Write your Comment<span className="text-red-600">*</span>
					</label>
					<Textarea
						id="new-comment"
						rows={16}
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						placeholder="Write your comment..."
					/>
					<div className="flex justify-end gap-3">
						<Button
							variant="outline"
							className="w-[216px] h-11 shadow-none"
							onClick={handleCancel}
						>
							Cancel
						</Button>
						<Button
							variant={"primary-green"}
							onClick={handleSubmit}
							className="w-[216px] h-11 shadow-none"
							disabled={!newComment.trim()}
						>
							Submit
						</Button>
					</div>
				</div>
			)}
			{/* Comments List */}
			<div className="space-y-6">
				{comments?.results?.map((c) => (
					<div key={c.id} className="flex flex-col gap-2">
						{/* Avatar */}
						<div className="flex items-start gap-3">
							<Avatar className="size-10">
								<AvatarImage src="/assets/avatar.png" alt="@shadcn" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div className="flex flex-col gap-1 text-sm">
								<span className="font-normal text-primay-green tracking-tight leading-none">
									{c?.user?.name}
								</span>
								<span className="leading-none text-sm text-muted-foreground">
									{formatDistanceToNow(new Date(c?.created_at || ""), { addSuffix: true })}
								</span>
							</div>
						</div>

						{/* Body */}
						<div className="flex-1 space-y-1">
							<p className="text-gray-700 font-light text-sm">{c?.content}</p>
							<div className="flex items-center text-gray-500 text-sm mt-2">
								<Button
									variant="ghost"
									size="sm"
									className="flex items-center gap-1  hover:text-green-600"
									onClick={() => onLike?.(c?.id)}
								>
									<ThumbsUp className="w-4 h-4" /> {c.likes}
								</Button>
								<Button
									variant="ghost"
									size="sm"
									className="flex items-center gap-1 hover:text-red-600"
									onClick={() => onReply?.(c?.id)}
								>
									<ThumbsDown className="w-4 h-4" /> {c.replies}
								</Button>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="flex justify-between">
				<div>
					<Button
						onClick={() => setIsAdding(true)}
						variant={"primary-green"}
						className="flex items-center gap-1 "
					>
						<MessageSquareTextIcon className="w-4 h-4" /> Add Comment
					</Button>
				</div>
				<div>
				{/* {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )} */}
				<div className="my-8 *:flex justify-center">
								<PaginationControls
									currentPage={filters?.page}
									totalCount={totalCount || 0}
									pageSize={filters?.page_size || 0}
									onPageChange={(val) => {
										console.log('val', val)
											setFilters({
												...filters,
												page: val
											})
									}}
								/>
							</div>
					{/* <Pagination>
						<PaginationContent>
							{Array.from({ length: totalPages }).map((_, i) => (
								<PaginationItem key={i}>
									<PaginationLink
										href="#"
										isActive={i + 1 === currentPage}
										onClick={(e) => {
											e.preventDefault();
											onPageChange?.(i + 1);
										}}
									>
										{i + 1}
									</PaginationLink>
								</PaginationItem>
							))}

							{totalPages > 7 && <PaginationEllipsis />}
						</PaginationContent>
					</Pagination> */}
				</div>
			</div>
			{/* Pagination */}
		</div>
	);
}
