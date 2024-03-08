import { PostType } from "@/types";
import Link from "next/link";

type PostContentProps = {
  post: PostType
  from: string
}

const PostContent = async ({ post, from }: PostContentProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const res = await fetch(`${baseUrl}/api/user/${post.autherId}`);
  const json = await res.json();
  const auther = json.user;

  const createdAt = new Date(post.createdAt)

  return (
    <div className="mb-1">
      <div className="flex justify-start my-1">
        <p className="font-base text-lg">{auther.username}</p>
        <p className="text-stone-500 text-base font-light ml-3">{createdAt.toLocaleDateString()}</p>
      </div>
      <div className="">
      <p>{post.description}</p>
      </div>
    { from === "/app" 
    ? <Link href={`/post_detail/${post.id}`}><span className="mt-1 text-blue-500 hover:underline">show more...</span></Link>
    : <></> 
    }
    </div>
  )
}

export default PostContent;