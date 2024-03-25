"use client"

import { useRouter } from "next/navigation";
import Image from 'next/image'
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from 'react-modal'
import { Toaster, toast } from "react-hot-toast";
import { followUser, unFollowUser } from "@/functions/followUser";
import { zodResolver } from "@hookform/resolvers/zod";
import MiniLoading from "../loading/miniLoading";
import editProfile from "@/functions/editProfile";
import { profileInputs, ProfileInputsType } from "@/types";
import ClearIcon from '@mui/icons-material/Clear';
import initial_avatar from "../../../public/initial_avatar.png"

type ProfileInfoProps = {
  user: any,
  avaterUrl: string | null,
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
    height: "62%",
    width: "45%",
    border: "none",
    borderRadius: "20px",
    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  },
}

Modal.setAppElement('body') // bodyなど任意の要素に変更OK

const ProfileInfo = ({ user, signedInUserId, avaterUrl }: ProfileInfoProps) => {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [followingLength, setFollowingLength] = useState<number>(user.following.length)
  const [followersLength, setFollowersLength] = useState<number>(user.followers.length)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>();
  const [preview, setPreview] = useState<string>("");

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileInputsType>({ //zodで定義したスキーマから取り出した型を設定する
    resolver: zodResolver(profileInputs), //zodで定義したスキーマでバリデーションするため
    defaultValues: { username: user.username, introduction: user.introduction ?? "" }
  });

  const onSubmit: SubmitHandler<ProfileInputsType> = async (data) => {
    setIsLoading(true);
    await editMyProfile(data.username, data.introduction, file, user.avatar);
    closeModal();
    setIsLoading(false);
    router.push(`/profile/${signedInUserId}`)
    router.refresh();
  }

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(window.URL.createObjectURL(e.target.files[0]))
    } else {
      setFile(null);
      setPreview("");
    }
  }

  useEffect(() => {
    for (const follower of user.followers) {
      if(String(follower.followerId) === String(signedInUserId)) {
        setIsFollowing(true);
        break;
      }
    }
    setIsLoading(false);
  }, []);


  useEffect(() => {
    const windowInnerWidth: number | null | undefined = window.innerWidth
    const windowInnerHeight: number | null | undefined = window.innerHeight

    if(windowInnerWidth >= 1100 || !windowInnerWidth) { 
      customStyles.content.height = "65%";
    } else if (windowInnerWidth >= 900) {
      customStyles.content.width = "60%";
    } else if (windowInnerWidth >= 750) {
      customStyles.content.width = "70%";
    } else if (windowInnerWidth >= 640) {
      customStyles.content.width = "80%";
    } else {
      customStyles.content.width = "90%";
    }
    
    if(windowInnerHeight < 700 && windowInnerWidth < 640) {
      customStyles.content.height = "70%";
    } else if (windowInnerHeight < 900 && windowInnerWidth < 640) {
      customStyles.content.height = "55%"
    }
    else if (windowInnerHeight < 1000 && windowInnerWidth < 640) {
      customStyles.content.height = "50%";
    }
  }, [])


  

  const follow = async () => {
    setIsLoading(true);
    if(isFollowing) {
      toast.loading("unfollowing", { id: "unfollowing"});
      const result: boolean = await unFollowUser(signedInUserId, user.id);
      if(result) {
        setFollowersLength(followersLength - 1);
        setIsFollowing(!isFollowing)
        toast.success("Success", { id: "unfollowing" });
        router.push(`/profile/${user.id}`)
        router.refresh();
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
        router.push(`/profile/${user.id}`)
        router.refresh();
      } else {
        toast.error("Error", { id: "following"});
      }
    }
    setIsLoading(false);
  }

  const editMyProfile = async (newUsername: string, newIntroduction: string, file: File | null | undefined, prevFileName: string | null) => {
    const result = await editProfile(user.id, newUsername,  newIntroduction, file, prevFileName);
    if(result) {
    } else {
      alert("編集できませんでした");
    }
    setFile(null);
    setPreview("");
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
          { isLoading 
          ? <MiniLoading />
          : 
          <div className="relative h-[100px] w-[100px]">
            { user.avatar && avaterUrl
            ? <Image src={avaterUrl} alt="avatar" fill objectFit="cover" className="border rounded-full"/>
            : <Image src={initial_avatar} alt="avatar" fill objectFit="cover" className="border rounded-full"/>
            }
          </div>
          }
          <h1 className="mt-3 text-3xl font-semibold">{user.username}</h1>
          { isLoading ? <div className="mr-14 mt-1"><MiniLoading /></div> : <></>}
          { isLoading || signedInUserId === user.id 
          ? 
            <button 
            onClick={() => {openModal()}}
            className="mt-3 mr-3 px-4 py-1 h-10 text-blue-500 font-medium rounded-full border-2 border-blue-500 hover:text-white hover:bg-blue-500"
            >
              Edit Profile
            </button>
          : 
            <button 
            onClick={() => follow()}
            className="mt-3 mr-3 px-4 py-1 h-10 text-blue-500 font-medium rounded-full border-2 border-blue-500 hover:text-white hover:bg-blue-500"
            >
            { isLoading
            ? <></>
            : isFollowing 
              ? <>unfollow</>
              : <>follow</>
            }
            </button>
          }
        </div>
        <p className="mt-2 text-lg">{user.introduction}</p>
        <div className="mt-3">
          <button 
          onClick={() => {router.push(`/following_list/${user.id}`)}} 
          className="hover:underline">
            following {followingLength}
          </button>
          <button 
          onClick={() => {router.push(`/followers_list/${user.id}`)}} 
          className="ml-3 hover:underline"
          >followers {followersLength}
          </button>
        </div>
      </div>
      <Modal
        contentLabel="Edit Profile Modal"
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
              <div className="mb-2">
                <label htmlFor="icon">
                  <div className="relative h-[100px] w-[100px]">
                    <Image src={preview ? preview : user.avatar && avaterUrl ? avaterUrl : initial_avatar} fill objectFit="cover" alt="avatar" className="rounded-full border-2 hover:border-4"/>
                  </div>
                </label>
                <input id="icon" type="file" accept=".png, .jpg, jpeg" {...register("avatar")} onChange={handleChangeFile} className="hidden"/>
              </div>
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
              { isLoading
              ?
                <MiniLoading />
              :
                <button 
                className="ml-auto px-3 my-4 rounded-full border-2 border-blue-500 text-lg text-blue-500 hover:bg-blue-500 hover:text-white"
                >
                  Save
                </button>
              }
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProfileInfo