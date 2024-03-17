import { useUser } from "@/hooks/useUser"
import { PostType } from "@/types"
import { useSession } from "next-auth/react"
import Link from "next/link"
import MoreButton from "./moreButton"

type SearchedPostContentProps = {
  post: PostType,
}

const SearchedPostContent = ({ post }: SearchedPostContentProps) => {
  const { data: session, status } = useSession();
  const { user, error, isLoading } = useUser(post.autherId);

  if(isLoading) return <div>Loading...</div>
  if (error) return <div>Error occurred: {error.message}</div>;
  if(!user) return <div>ユーザーが見つかりませんでした</div>

  const createdAt = new Date(post.createdAt);

  return (
    <div className="mb-1">
      <div className="flex justify-start my-1">
        <p className="font-base text-lg hover:underline"><Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${post.autherId}`}>{user.username}</Link></p>
        <p className="text-stone-500 text-base font-light ml-3">{createdAt.toLocaleDateString()}</p>
        { Number(session?.user.id) === post.autherId ? <MoreButton postId={post.id} /> : <></>}
      </div>
      <div className="">
      <p>{post.description}</p>
      </div>
      <Link href={`/post_detail/${post.id}`}><span className="mt-1 text-blue-500 hover:underline">show detail</span></Link>
    </div>
  )
}

export default SearchedPostContent