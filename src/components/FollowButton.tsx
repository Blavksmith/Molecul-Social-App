"use client";

import { Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { toggleFollow } from "@/actions/user.actions";

const FollowButton = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);

    try {
      await toggleFollow(userId);
      toast.success("Followed successfully");
    } catch (err) {
      toast.error("Failed to follow user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size={"sm"}
      variant={"secondary"}
      onClick={handleFollow}
      disabled={isLoading}
    >
      {isLoading ? <Loader2Icon className="w-4 h-4 animate-spin" /> : "Follow"}
    </Button>
  );
};

export default FollowButton;
