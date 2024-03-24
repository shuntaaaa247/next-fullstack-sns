import { options } from "@/options";
import { getServerSession } from "next-auth";
import { PostType } from "@/types";
import Link from "next/link";
import MoreButton from "./moreButton";
import { supabase } from "@/supabase";
import Image from "next/image";
import initial_avatar from "../../../public/initial_avatar.png";
import PostPhoto from "./postPhoto";
import fetchUser from "@/functions/fetchUser";

type PostContentProps = {
  post: PostType
  from: string
}

const PostContent = async ({ post, from }: PostContentProps) => {
  const session = await getServerSession(options);
  const { user: auther, avatarUrl: autherAvatarUrl } = await fetchUser(String(post.autherId))
  const createdAt = new Date(post.createdAt);

  return (
    <div className="mb-1">
      <div className="flex justify-start my-1">
        <div className="relative h-[35px] w-[35px] mr-3">
          { auther.avatar && autherAvatarUrl
          ? <Image src={autherAvatarUrl} alt="avatar" fill objectFit="cover" className="border rounded-full"/>
          : <Image src={initial_avatar} alt="avatar" fill objectFit="cover" className="border rounded-full"/>
          }
        </div>
        <p className="font-base text-lg hover:underline"><Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${auther.id}`}>{auther.username}</Link></p>
        <p className="text-stone-500 text-base font-light ml-3">{createdAt.toLocaleDateString()}</p>
        { Number(session?.user.id) === post.autherId ? <MoreButton postId={post.id} /> : <></>}
      </div>
      <div className="">
      <p className="whitespace-pre-wrap">{post.description}</p>
      { post.photo && post.photoUrl 
        ? <PostPhoto photoUrl={post.photoUrl}/>
        : <></> 
      }
      </div>
    { from === "/app" 
    ? <Link href={`/post_detail/${post.id}`}><span className="mt-1 text-blue-500 hover:underline">show detail</span></Link>
    : <></> 
    }
    </div>
  )
}

export default PostContent;
