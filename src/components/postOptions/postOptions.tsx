"use client"
import { useEffect, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useSession} from "next-auth/react";
import { SessionProvider } from "next-auth/react"
import { LikeType } from "@/types";
import { likePost, deleteLike } from "@/functions/likePost";

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
      const deleteResult: boolean = await deleteLike(postId, Number(session?.user.id) ?? null);
      if(deleteResult) {
        setLikeCount(likeConunt - 1);
        setIsLiked(!isLiked);
      } else {
        alert("いいねを解除できませんでした")
      }
    } else {
      const likeResult: boolean = await likePost(postId, Number(session?.user.id) ?? null);
      if(likeResult) {
        setLikeCount(likeConunt + 1)
        setIsLiked(!isLiked);
      } else {
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
    <div className="">
      { isLiked 
      ? <button onClick={() => handleLike()} className="mb-1"><FavoriteIcon className="text-rose-500 hover:text-rose-700"/></button>
      : <button onClick={() => handleLike()} className="mb-1"><FavoriteBorderIcon className="hover:text-rose-500"/></button> 
      }
      <span className="">{ likeConunt }</span>
    </div>
  )
}