"use client"

import { useSearchPost, useSearchUser } from "@/hooks/useSearch"
import { PostType } from "@/types"
import { useSearchParams } from "next/navigation"
import Post from "../post/post"
import Loading from "../loading/Loading"
import { useState } from "react"
import UserOnList from "../user/userOnList"
import { useRouter } from "next/navigation"

const SearchResult = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const text = searchParams.get('text');
  const mode = searchParams.get('mode');
  const { posts, isLoading: postLoading, error: postError } = useSearchPost(text ?? "");
  const { users, isLoading: userLoading, error: userError } = useSearchUser(text ?? "");
  // const [mode, setMode] = useState<string>("post");

  if(mode === "post") {
    if (postLoading) return <div><Loading /></div>;
    if (postError) return <div>Error occurred: {postError.message}</div>;
    if(!posts) return <div></div>

    return(
      <div>
        <div className="flex w-full border-b border-t">
          <button onClick={() => router.push(`/search?text=${text}&mode=post`)} className="border-r w-1/2 py-2 font-semibold hover:bg-blue-50">Post</button>
          <button onClick={() => router.push(`/search?text=${text}&mode=user`)} className="w-1/2 py-2 hover:bg-blue-50">User</button>
        </div>
        {posts.map((post: PostType) => {
          return (
            <div key={post.id}>
              <Post post={post} from={"/search"}/>
            </div>
          );
        })}
      </div>
    )
  } else if(mode === "user") {
    if (userLoading) return <div><Loading /></div>;
    if (userError) return <div>Error occurred: {postError.message}</div>;
    if(!users) return <div></div>

    return(
      <div>
        <div className="flex w-full border-b border-t">
          <button onClick={() => router.push(`/search?text=${text}&mode=post`)} className="border-r w-1/2 py-2 hover:bg-blue-50">Post</button>
          <button onClick={() => router.push(`/search?text=${text}&mode=user`)} className="w-1/2 py-2 font-semibold hover:bg-blue-50">User</button>
        </div>
        {users.map((user: any) => {
          return (
            <div key={user.id}>
              <UserOnList user={user}/>
            </div>
          );
        })}
      </div>
    )
  }
}

export default SearchResult
