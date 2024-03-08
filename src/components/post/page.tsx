import { PostType } from "@/types";
import PostContent from "../postContent/page";
import { useState } from "react";
import PostOptions from "../postOptions/page";


type PostProps = {
  post: PostType
}

const Post = ({ post }: PostProps) => {
  return (
    <div>
      <div className="pl-3 border-b hover:bg-stone-50">
        <PostContent post={post}/>
        <PostOptions />
      </div>
    </div>
  )
}

export default Post;