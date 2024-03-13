"use client"

import { followUser, unFollowUser } from "@/functions/followUser";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from 'react-modal'
import { Toaster, toast } from "react-hot-toast";
import MiniLoading from "../loading/miniLoading";
import editProfile from "@/functions/editProfile";
import { profileInputs, ProfileInputsType } from "@/types";
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from "next/navigation";

type ProfileInfoProps = {
  user: any,
  signedInUserId: number
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: "50%",
    width: "45%",
    border: "none",
    borderRadius: "20px",
    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  },
}

Modal.setAppElement('body') // bodyなど任意の要素に変更OK

const ProfileInfo = ({ user, signedInUserId }: ProfileInfoProps) => {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [followingLength, setFollowingLength] = useState<number>(user.following.length)
  const [followersLength, setFollowersLength] = useState<number>(user.followers.length)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileInputsType>({ //zodで定義したスキーマから取り出した型を設定する
    resolver: zodResolver(profileInputs), //zodで定義したスキーマでバリデーションするため
    defaultValues: { username: user.username, introduction: user.introduction ?? "" }
  });

  const onSubmit: SubmitHandler<ProfileInputsType> = async (data) => {
    await editMyProfile(data.username, data.introduction);
    closeModal();
    router.push(`/profile/${signedInUserId}`)
    router.refresh();
  }

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
      const result: boolean = await unFollowUser(signedInUserId, user.id);
      if(result) {
        setFollowersLength(followersLength - 1);
        setIsFollowing(!isFollowing)
        toast.success("Success", { id: "unfollowing" })
      } else {
        toast.error("Error", { id: "unfollowing" })
      }
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

  const editMyProfile = async (newUsername: string, newIntroduction: string) => {
    const result = await editProfile(user.id, newUsername,  newIntroduction);
    if(result) {
    } else {
      alert("編集できませんでした");
    }
  }

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false)
  }

  return(
    <div className="py-3 border-b">
      <div className="ml-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">{user.username}</h1>
          { isLoading ? <div className="mr-14 mt-1"><MiniLoading /></div> : <></>}
          { isLoading || signedInUserId === user.id 
          ? 
            <button 
            onClick={() => openModal()}
            className="mr-3 px-4 py-1 text-blue-500 font-medium rounded-full border-2 border-blue-500 hover:text-white hover:bg-blue-500"
            >
              Edit Profile
            </button>
          : 
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
        <p className="mt-2 text-lg">{user.introduction}</p>
        <div className="mt-3">
          <button className="hover:underline">following {followingLength}</button>
          <button className="ml-3 hover:underline">followers {followersLength}</button>
        </div>
      </div>
      <Modal
        contentLabel="Example Modal"
        isOpen={modalIsOpen}
        style={customStyles}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <div className='flex h-[12%]'>
          <div className="flex flex-col w-full">
            <div className="flex justify-between flex-auto">
              <button onClick={() => closeModal()} className="">
                <ClearIcon />
              </button>
            </div>
            <form className="flex flex-col mt-3 mx-5 flex-auto" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col mb-3 rounded-md border-2 border-slate-300">
                <label htmlFor="username" className="px-3 py-2 text-sm">username</label>
                <input type="text" id="username" className="px-3 pb-2 text-xl outline-none" {...register("username")} />
                <p className="">
                {errors.username?.message}
              </p>
              </div>
              <div className="flex flex-col rounded-md border-2 border-slate-300 h-4/5">
                <label htmlFor="introduction" className="px-3 py-2 text-sm">Introduction</label>
                <textarea id="introduction" className="px-3 pb-[17%] text-lg outline-none resize-none" {...register("introduction")}></textarea>
                <p>
                {errors.introduction?.message}
                </p>
              </div>
              <button 
              className="ml-auto px-3 mt-4 rounded-full border-2 border-blue-500 text-lg text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProfileInfo