"ise client";

import { getPosts } from "@/actions/post.action";
import { useUser } from "@clerk/nextjs";
import { Post } from "@prisma/client";
import React, { useState } from "react";


// Creating custom type for Post object to return from getPosts function
// Avoiding to use Post type from Prisma directly, which is not recommended :D
type Posts = Awaited <ReturnType<typeof getPosts>>

function PostCard({ post, dbUserId }: { post: Post; dbUserId: string | null }) {
  const { user } = useUser();
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasLiked, setHasLiked] = useState(false); // check if user has liked the post or not
  const [likes, setLikes] = useState(post._count.likes); // handling number of likes

  return <div>PostCard</div>;
}

export default PostCard;
