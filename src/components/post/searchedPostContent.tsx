"use client"
import { useUser } from "@/hooks/useUser"
import { PostType } from "@/types"
import { useSession } from "next-auth/react"
import Link from "next/link"
import MoreButton from "./moreButton"
import { useEffect, useState } from "react"
import { supabase } from "@/supabase"
import Image from "next/image"
import initial_avatar from "../../../public/initial_avatar.png"
import MiniLoading from "../loading/miniLoading"
import PostPhoto from "./postPhoto"

type SearchedPostContentProps = {
  post: PostType,
}

const SearchedPostContent = ({ post }: SearchedPostContentProps) => {
  const { data: session, status } = useSession();
  const { user, error, isLoading } = useUser(post.autherId);

  const [autherAvatarUrl, setAutherAvatarUrl] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string| null>(null);
  const [isAvatarLoading, setIsAvatarLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAvatar = async () => {
      if(user && user.avatar) {
        try {
          const { data } = await supabase
            .storage
            .from("avatars")
            .getPublicUrl(user.avatar)
          
          setAutherAvatarUrl(data.publicUrl);
        } catch(err) {
          console.log(err);
        }
      }
    }
    getAvatar();
    setIsAvatarLoading(false);

    const getPhoto = async () => {
      if(post && post.photo) {
        try {
          const { data } = await supabase
            .storage
            .from("photos")
            .getPublicUrl(post.photo)
          
          setPhotoUrl(data.publicUrl);
        } catch(err) {
          console.log(err);
        }
      }
    }
    getPhoto();
    setIsAvatarLoading(false);
  }, [user])

  if(isLoading) return <div>Loading...</div>
  if (error) return <div>Error occurred: {error.message}</div>;
  if(!user) return <div>ユーザーが見つかりませんでした</div>

  const createdAt = new Date(post.createdAt);

  return (
    <div className="mb-1">
      <div className="flex justify-start my-1">
        <div className="relative h-[35px] w-[35px] mr-3">
          { isAvatarLoading 
          ? <MiniLoading />
          :  user.avatar && autherAvatarUrl
            ? <Image src={autherAvatarUrl} alt="avatar" fill objectFit="cover" className="border rounded-full"/>
            : <Image src={initial_avatar} alt="avatar" fill objectFit="cover" className="border rounded-full"/>
            
          }
        </div>
        <p className="font-base text-lg hover:underline"><Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${post.autherId}`}>{user.username}</Link></p>
        <p className="text-stone-500 text-base font-light ml-3">{createdAt.toLocaleDateString()}</p>
        { Number(session?.user.id) === post.autherId ? <MoreButton postId={post.id} /> : <></>}
      </div>
      <div className="">
      <p>{post.description}</p>
      { post.photo && photoUrl 
        ? <PostPhoto photoUrl={photoUrl}/>
        : <></> 
      }
      </div>
      <Link href={`/post_detail/${post.id}`}><span className="mt-1 text-blue-500 hover:underline">show detail</span></Link>
    </div>
  )
}

export default SearchedPostContent