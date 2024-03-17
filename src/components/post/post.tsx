import { PostType } from "@/types";
import PostContent from "./postContent";
import PostOptions from "./postOptions";
import { SessionProvider } from "next-auth/react";
import SearchedPostContent from "./searchedPostContent";

type PostProps = {
  post: PostType, //投稿の型
  from: string //どのコンポーネント(ページ)から遷移してきたか
}

// const Post = async ({ post, from }: PostProps) => {
const Post = ({ post, from }: PostProps) => {
  if(from === "/app") {
    return (
      <div className="pl-3 border-b">
        <PostContent post={post} from={from}/>
        <PostOptions postId={post.id} likes={post.likes}/>
      </div>
    )
  } else if(from === "/post_detail/[id]") {
    return (
      <div className="pl-3 border-b">
        <div className="mx-5">
          <PostContent post={post} from={from}/>
          <PostOptions postId={post.id} likes={post.likes}/>
        </div>
      </div>
    )
  } else if (from === "/search") {
    return (
      <div className="pl-3 border-b">
        <SessionProvider>
          <SearchedPostContent post={post}/>
        </SessionProvider>
        <PostOptions postId={post.id} likes={post.likes}/>
      </div>
    )
  } else {
    <div>エラー</div>
  }
}

export default Post;