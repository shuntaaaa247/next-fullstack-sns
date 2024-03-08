"use client"
import { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const PostOptions = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeConunt, setLikeCount] = useState<number>(0);

  const handleLike = () => {
    isLiked ? setLikeCount(likeConunt - 1) : setLikeCount(likeConunt + 1);
    setIsLiked(!isLiked);
    alert("いいねが押されました")
  }

  return(
    <div>
      { isLiked 
      ? <button onClick={handleLike} className="mb-1"><FavoriteIcon className="text-rose-500 hover:text-rose-700"/><span className="">{ likeConunt }</span></button>
      : <button onClick={handleLike} className="mb-1"><FavoriteBorderIcon className="hover:text-rose-500"/><span className="">{ likeConunt }</span></button> }
    </div>
  )
}

export default PostOptions