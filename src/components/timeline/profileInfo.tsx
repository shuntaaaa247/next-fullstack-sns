"use client"

import { followUser } from "@/functions/followUser";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import MiniLoading from "../loading/miniLoading";

type ProfileInfoProps = {
  user: any,
  signedInUserId: number
}

const ProfileInfo = ({ user, signedInUserId }: ProfileInfoProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [followingLength, setFollowingLength] = useState<number>(user.following.length)
  const [followersLength, setFollowersLength] = useState<number>(user.followers.length)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    for (const follower of user.followers) {
      console.log("followerId:", follower.followerId)
      if(String(follower.followerId) === String(signedInUserId)) {
        setIsFollowing(true);
        break;
      }
    }
    setIsLoading(false);
  }, []);

  const follow = async () => {
    setIsLoading(true);
    if(isFollowing) {
      toast.loading("unfollowing", { id: "unfollowing"});

    } else {
      toast.loading("following", { id: "following"});
      const result: boolean = await followUser(signedInUserId, user.id);
      if(result) {
        setFollowersLength(followersLength + 1);
        setIsFollowing(!isFollowing);
        toast.success("Success", { id: "following"});
      } else {
        toast.error("Error", { id: "following"});
      }
    }
    setIsLoading(false);
  }

  return(
    <div className="py-3 border-b">
      <div className="ml-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">{user.username}</h1>
          { isLoading ? <div className="mr-14 mt-1"><MiniLoading /></div> : <></>}
          { isLoading || signedInUserId === user.id ? <></> : 
            <button 
            onClick={() => follow()}
            className="mr-3 px-4 py-1 text-blue-500 font-medium rounded-full border-2 border-blue-500 hover:text-white hover:bg-blue-500"
            >
            { isFollowing 
            ? <>unfollow</>
            : <>follow</>
            }
            </button>
          }
        </div>
        <p>{user.description}</p>
        <div className="mt-3">
          <button className="hover:underline">following {followingLength}</button>
          <button className="ml-3 hover:underline">followers {followersLength}</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo

const ProfileInfoContent = () => {
  
}