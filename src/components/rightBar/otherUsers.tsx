"use client"

import { useEffect, useState } from "react"
import initial_avatar from "../../../public/initial_avatar.png";
import Image from "next/image";
import { supabase } from "@/supabase";
import { useRouter } from "next/navigation";

type OtherUserProps = {
  user: any,
}

const OtherUser = ({ user }: OtherUserProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const fetchAvatarUrl = async () => {
      const { data } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(user.avatar)
      setAvatarUrl(data.publicUrl)
    }
    if(user.avatar) {
      const url = fetchAvatarUrl()
    }
  })

  if(!user || !user.id) {
    return(
      <p>ユーザーが見つかりませんでした</p>
    )
  }
  return(
    <>
      <div className="relative w-[50px] h-[50px] ml-3 mt-3">
        <Image 
        src={ user.avatar ? avatarUrl : initial_avatar} 
        fill 
        objectFit="cover" 
        alt="avatar" 
        className="rounded-full border hover:border-2 hover:cursor-pointer"
        onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${user.id}`)}
        /> 
        </div>
      <h1 className="my-auto ml-3 hover:underline hover:cursor-pointer" onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${user.id}`)}>{user.username}</h1>
    </>
  )
}

export default OtherUser