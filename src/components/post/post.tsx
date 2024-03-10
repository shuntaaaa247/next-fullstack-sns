import { PostType } from "@/types";
import PostContent from "./postContent";
import PostOptions from "./postOptions";

type PostProps = {
  post: PostType, //投稿の型
  from: string //どのコンポーネント(ページ)から遷移してきたか
}

const Post = async ({ post, from }: PostProps) => {
  if(from === "/app") {
    return (
      <div className="pl-3 border-b">
        <PostContent post={post} from={from}/>
        <PostOptions postId={post.id} likes={post.likes}/>
      </div>
    )
  } else {
    return (
      <div className="pl-3 border-b">
        <div className="mx-5">
          <PostContent post={post} from={from}/>
          <PostOptions postId={post.id} likes={post.likes}/>
        </div>
      </div>
    )
  }
}

export default Post;