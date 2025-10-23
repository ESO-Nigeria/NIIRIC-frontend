"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Profile, User } from "../types/profile";
import { getInitials } from "@/helpers/helpers";

interface PublisherProfileCardProps {
  publisher?: Profile | null;
  user?: User;
  showFollowButton?: boolean;
  isFollowing?: boolean;
  onFollowToggle?: (following: boolean) => void;
  followButtonText?: { follow?: string; unfollow?: string };
  className?: string;
}

export default function PublisherProfileCard({
  publisher,
  user,
  showFollowButton = false,
  isFollowing: initialFollowing = false,
  onFollowToggle,
  followButtonText = { follow: "Follow", unfollow: "Unfollow" },
  className = "",
}: PublisherProfileCardProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  const handleFollowClick = () => {
    const newFollowState = !isFollowing;
    setIsFollowing(newFollowState);
    onFollowToggle?.(newFollowState);
  };

  return (
    <Card className={`shadow-none border-0 rounded-xl ${className}`}>
      
      <CardHeader className="flex flex-col items-center p-4">
        {/* Avatar */}
        <h3 className="text-base font-medium text-center text-[#3F434A] mb-4">
                  About this Author
                </h3>
        <Avatar className="w-26 h-26">
          <AvatarImage src={publisher?.image_url} alt="Profile" />
          <AvatarFallback>
            {/* {publisher?.first_name?.[0]}
            {publisher?.last_name?.[0]}
            {publisher?.full_name} */}
            {getInitials(publisher?.full_name)}
          </AvatarFallback>
        </Avatar>

        {/* Name */}
        <h2 className="mt-4 capitalize font-medium text-base text-[#3F434A] text-center">
          {publisher?.title} {publisher?.full_name}
        </h2>

           <div className="flex gap-8 my-4">
                    <div className="text-center">
                      <div className="text-base font-medium text-[#475467]">
                         {user?.publication_count ?? 0}
                      </div>
                      <div className="text-[9px] text-[#475467]">
                        Publications
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-base font-medium text-[#475467]">
                        {user?.follower_count ?? 0}
                      </div>
                      <div className="text-[9px] text-[#475467]">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-base font-medium text-[#475467]">
                        0
                      </div>
                      <div className="text-[9px] text-[#475467]">
                        Connections
                      </div>
                    </div>
                  </div>


         {/* Follow Button (optional) */}
        {showFollowButton && (
          <div>
                              <Button
                              onClick={handleFollowClick}
                              variant={isFollowing ? "primary-brown-soft" : "primary-green"}
                                // variant={"primary-green"}
                                 //   className={`mt-3 text-sm rounded-full px-4 py-1 ${
                                //     isFollowing
                                //       ? "border-[#2F358B] text-[#2F358B] bg-transparent"
                                //       : "bg-[#2F358B] text-white"
                                //   }`}
                                // >
                                className="h-11 w-[161px] rounded-8"
                              >
                                {isFollowing ? followButtonText.unfollow : followButtonText.follow}
                              </Button>
                            </div>
        )}

      </CardHeader>
    </Card>
  );
}
