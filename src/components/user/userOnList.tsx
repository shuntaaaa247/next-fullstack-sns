"use client"
import { supabase } from "@/supabase"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import MiniLoading from "../loading/miniLoading"
import Image from "next/image"
import initial_avatar from "../../../public/initial_avatar.png"

type UserOnListProps = {
  user: any
}

const UserOnList = ({ user }: UserOnListProps) => {
  const router = useRouter();

  const [avatarImageUrl, setAvatarImageUrl] = useState<string | null>(null);
  const [isAvatarLoading, setIsAvatarLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAvatar = async () => {
      if(user && user.avatar) {
        try {
          const { data } = await supabase
            .storage
            .from("avatars")
            .getPublicUrl(user.avatar)
          
          setAvatarImageUrl(data.publicUrl);
        } catch(err) {
          console.log(err);
        }
      }
    }
    getAvatar();
    setIsAvatarLoading(false);
  }, [user])

  const handleClick = () => {
    router.push(`/profile/${user.id}`)
  }
  return(
    <div onClick={() => handleClick()} className="border-b hover:bg-blue-50 cursor-pointer">      
      <div className="mx-4 py-1">
        <div className="relative h-[35px] w-[35px] mr-3">
        { isAvatarLoading 
        ? <MiniLoading />
        :  user.avatar && avatarImageUrl
          ? <Image src={avatarImageUrl} alt="avatar" fill objectFit="cover" className="border rounded-full"/>
          : <Image src={initial_avatar} alt="avatar" fill objectFit="cover" className="border rounded-full"/>
        }
        </div>
        <p className="text-xl font-semibold">{ user.username }</p>
        <p>{ user.introduction }</p>
        <p>{ user.password }</p>
      </div>
    </div>
  )
}

export default UserOnList