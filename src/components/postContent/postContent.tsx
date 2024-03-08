import { PostType } from "@/types";

type PostContentProps = {
  post: PostType
}

const PostContent = async ({ post }: PostContentProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const res = await fetch(`${baseUrl}/api/user/${post.autherId}`);
  const json = await res.json();
  const auther = json.user;

  const createdAt = new Date(post.createdAt)

  return (
    <div className="mb-1">
      <div className="flex justify-start my-1">
        <p className="font-medium">{auther.username}</p>
        <p className="text-stone-500 text-base font-light ml-3">{createdAt.toLocaleDateString()}</p>
      </div>
      <div className="">
      <p>{post.description}</p>
      </div>
    </div>
  )
}

export default PostContent;