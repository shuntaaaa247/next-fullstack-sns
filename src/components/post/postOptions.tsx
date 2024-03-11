"use client"
import { useEffect, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useSession} from "next-auth/react";
import { SessionProvider } from "next-auth/react"
import { LikeType } from "@/types";
import { likePost, deleteLike } from "@/functions/likePost";
import Image from 'next/image';
import likeBorderIcon from "../../../public/svg/like-border.svg";
import likeFillIcon from "../../../public/svg/like-fill.svg"

type PostOptionsProps = {
  postId: Number,
  likes: LikeType[]
}

const PostOptions = ({ postId, likes }: PostOptionsProps) => {

  return(
    <SessionProvider>
      <PostOptionContent postId={postId} likes={likes}/>
    </SessionProvider>
  )
}

export default PostOptions

const PostOptionContent = ({ postId, likes }: PostOptionsProps) => {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? ""
  const { data: session, status } = useSession()

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeConunt, setLikeCount] = useState<number>(likes?.length ?? 0);

  const handleLike = async () => {
    if(isLiked) {
      setLikeCount(likeConunt - 1);
      setIsLiked(!isLiked);
      const deleteResult: boolean = await deleteLike(postId, Number(session?.user.id) ?? null);
      if(deleteResult) {
        // setLikeCount(likeConunt - 1);
        // setIsLiked(!isLiked);
      } else {
        setLikeCount(likeConunt + 1);
        setIsLiked(!isLiked);
        alert("いいねを解除できませんでした")
      }
    } else {
      setLikeCount(likeConunt + 1)
      setIsLiked(!isLiked);
      const likeResult: boolean = await likePost(postId, Number(session?.user.id) ?? null);
      if(likeResult) {
        // setLikeCount(likeConunt + 1)
        // setIsLiked(!isLiked);
      } else {
        setLikeCount(likeConunt - 1)
        setIsLiked(!isLiked);
        alert("いいねが押せませんでした。")
      }
    }
  }

  useEffect(() => {
    if(likes?.length > 0) {
      likes.map((like: LikeType) => {
        if(like.fromUserId === Number(session?.user.id)) {
          setIsLiked(true);
        }
      })
    }
  }, [likes, session?.user.id])

  return(
    <div className="flex">
      { isLiked 
      ? 
      // <button onClick={() => handleLike()} className="mb-1 text-rose-500 hover:text-rose-700"><FavoriteIcon /></button>
      // <button onClick={() => handleLike()}><FavoriteIcon /></button>
      <button onClick={() => handleLike()}>
        <Image src={likeFillIcon} alt="like" width={27} height={27}/>
      </button> 
      : 
      // <button onClick={() => handleLike()}><FavoriteBorderIcon/></button> 
      <button onClick={() => handleLike()} className="mb-1">
        <Image src={likeBorderIcon} alt="like" width={27} height={27}/>
        {/* <span className="px-2 border-2 border-blue-500 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white">Like</span> */}
      </button> 
      // <button onClick={() => handleLike()} className="mb-1 hover:text-rose-500"><FavoriteBorderIcon/></button> 
      }
      <span className="ml-1">{ likeConunt }</span>
    </div>
  )
}