"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import Modal from 'react-modal'
import { useUser } from "@/hooks/useUser"
import initial_avatar from "../../../public/initial_avatar.png"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { deleteUser } from "@/functions/deleteUser"
import MiniLoading from "../loading/miniLoading"

const customStyles = {
  content: {
    right: 'auto',
    bottom: '10%',
    top: 'auto%',
    left: '5%',
    height: "",
    zIndex: "20",
    border: "none",
    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)", 
  },
}

Modal.setAppElement("body");


type UserButtonProps = {
  userId: string
}

const UserButton = ({ userId }: UserButtonProps) => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isCheckForDelete, setIsCheckForDelete] = useState<boolean>(false);
  const [isCheckForSignout, setIsCheckForSignout] = useState<boolean>(false);
  const [isLoadingForTransition, setIsLoadingForTransition] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    const windowInnerWidth: number = window.innerWidth;
    const windowInnerHeight: number = window.innerWidth;
    setWindowWidth(windowInnerWidth);
    if(windowInnerWidth < 640) {
      customStyles.content.top = "60px";
      customStyles.content.left = "0px";
      customStyles.content.height = "100%";
    }
  }, [])

  const handleDeleteUser = async () => {
    setIsLoadingForTransition(true);
    const isSuccess: boolean = await deleteUser(userId);
    if(isSuccess) {
      signOut();
    } else {
      alert("エラー");
      setIsLoadingForTransition(false);
    }
  }

  const handleSignOut = () => {
    setIsLoadingForTransition(true);
    signOut()
  }

  function openModal() {
    setModalIsOpen(true)
  }
  
  function afterOpenModal() {
  }
  
  function closeModal() {
    setModalIsOpen(false);
    setIsCheckForDelete(false);
    setIsCheckForSignout(false)
  }

  const {user, avatarUrl, error, isLoading} = useUser(Number(userId));
  if(error && userId) {
    return(
      <div>
        <p>ユーザーが見つかりませんでした</p>
      </div>
    )
  }
  return(
    <div className="" id="username">
      { isLoading
      ? 
      <></>
      :
        <div onClick={openModal} className='sm:w-4/5 py-1 px-3 mx-auto rounded-full sm:border flex sm:hover:border-2 hover:cursor-pointer'>
          <div className="relative w-[45px] h-[45px] sm:w-[50px] sm:h-[50px]">
            <Image 
            src={ avatarUrl ? avatarUrl : initial_avatar} 
            fill 
            objectFit="cover" 
            alt="avatar" 
            className="rounded-full border mt-[5px] sm:mt-0"
            /> 
          </div>
          { windowWidth && windowWidth < 640
          ? 
            <></>
          :
          <div className="my-auto ml-2">
            <p className="text-xl">{user.username}</p>
          </div>
          }
        </div>
      }
      <Modal //editProfileが呼ばれたらレンダリングされる
        contentLabel="User Button Modal"
        isOpen={modalIsOpen}
        style={customStyles}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <div className="flex flex-col h-0 sm:h-auto invisible sm:visible">
          <div >
            <p className="text-rose-600 font-semibold text-lg hover: cursor-pointer" onClick={() => setIsCheckForDelete(true)}>
              アカウントを削除
            </p>
            { isCheckForDelete 
            ?
              isLoadingForTransition ? <MiniLoading /> : <button className="hover:underline" onClick={handleDeleteUser}>本当に削除する</button>
            :
              <></>
            }

          </div>
          <hr className="my-3"/>
          <div>
            <p className="text-rose-600 font-semibold text-lg hover: cursor-pointer" onClick={() => setIsCheckForSignout(true)}>サインアウト</p>
            { isCheckForSignout 
            ? isLoadingForTransition ? <MiniLoading /> : <button onClick={handleSignOut} className="hover:underline">本当にサインアウトする</button>
            : <></>
            }
          </div>
          <hr className="my-3"/>
          <div className="hover: cursor-pointer">
              <Link href={"/signin"}>別のアカウントでサインイン</Link>
            </div>
          <hr className="my-3"/>
          <div className="hover: cursor-pointer">
            <Link href={`/profile/${userId}`}>プロフィールへ移動</Link>
          </div>
        </div>

        <div className="visible sm:invisible sm:h-0">
          <div className="flex flex-col mb-auto">
            <div className="hover: cursor-pointer">
              <Link href={`/profile/${userId}`}>プロフィールへ移動</Link>
            </div>
            <hr className="my-3"/>
            <div className="hover: cursor-pointer">
              <Link href={"/signin"}>別のアカウントでサインイン</Link>
            </div>
            <hr className="my-3"/>
            <div>
              <p className="text-rose-600 font-semibold text-lg hover: cursor-pointer" onClick={() => setIsCheckForSignout(true)}>サインアウト</p>
              { isCheckForSignout 
              ? isLoadingForTransition ? <MiniLoading /> : <button onClick={handleSignOut} className="hover:underline">本当にサインアウトする</button>
              : <></>
              }
            </div>
            <hr className="my-3"/>
            <div >
              <p className="text-rose-600 font-semibold text-lg hover: cursor-pointer" onClick={() => setIsCheckForDelete(true)}>
                アカウントを削除
              </p>
              { isCheckForDelete 
              ?
                isLoadingForTransition ? <MiniLoading /> : <button className="hover:underline">本当に削除する</button>
              :
                <></>
              }
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UserButton