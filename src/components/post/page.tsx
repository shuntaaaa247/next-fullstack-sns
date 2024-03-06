import { PostType } from "@/types";

type PostProps = {
  post: PostType
}

const Post = ({ post }: PostProps) => {
  return (
    <div>
      <hr />
      <p>id: {post.id}</p>
      <p>createdAt: {String(post.createdAt)}</p>
      <p>autherId: {post.autherId}</p>
      <p>description: {post.description}</p>
    </div>
  )
}

export default Post;