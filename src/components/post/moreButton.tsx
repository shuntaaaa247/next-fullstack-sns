"use client"
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Toaster, toast } from "react-hot-toast"; 
import Modal from 'react-modal'
import deletePost from '@/functions/deletePost';
import moreHorizontalIcon from "../../../public/svg/more-horizontal-fromgpt.svg"
import clearIcon from "../../../public/svg/clear-icon-fromgpt.svg"
import Image from 'next/image';
import MiniLoading from '../loading/miniLoading';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: "13%",
    width: "20%",
    border: "none",
    borderRadius: "10px",
    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  },
}

Modal.setAppElement('body') // bodyなど任意の要素に変更OK

type MoreButtonProps = {
  postId: number
}

type MorePostOptionsModalProps = {
  postId: number
}

const MoreButton = ({ postId }: MoreButtonProps) => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const windowInnerWidth: number | null | undefined = window.innerWidth
    const windowInnerHeight: number | null | undefined = window.innerHeight

    if(windowInnerWidth >= 1100 || !windowInnerWidth) { 
    } else if (windowInnerWidth >= 900) {
      customStyles.content.width = "28%";
    } else if (windowInnerWidth >= 750) {
      customStyles.content.width = "36%";
    } else if (windowInnerWidth >= 640) {
      customStyles.content.width = "44%";
    } else {
      customStyles.content.width = "52%";
      if(windowInnerHeight < 700) {
        customStyles.content.height = "16%"
      }
    }
  }, [])

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false)
  }
  
  return(
    <div className='ml-auto'>
      <div className="mr-2">
        <Image onClick={openModal} src={moreHorizontalIcon} alt="more" width={25} height={25} className='rounded-full hover:bg-stone-100 cursor-pointer'/>

      </div> 
      <Modal
        contentLabel="More Modal"
        isOpen={modalIsOpen}
        style={customStyles}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <Image onClick={closeModal} src={clearIcon} alt="clear" width={25} height={25} className='p-1 rounded-full hover:bg-stone-100 cursor-pointer'/>
        <MorePostOptionsModal postId={postId}/>
      </Modal>
    </div>
  )
}

export default MoreButton

const MorePostOptionsModal = ({ postId }: MorePostOptionsModalProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

  const _deletePost = async () => {
    setIsDeleting(true);
    const result: boolean = await deletePost(postId);
    toast.loading("Deleting a post", { id: "deletePost"});//トースト
    if(result) {
      toast.success("Success", { id: "deletePost"});//トースト
      if(pathname === "/profile") {
        const id: string | null = searchParams.get("id");
        const mode: string | null = searchParams.get("mode");
        router.push(`${pathname}?id=${id}&mode=${mode}`)
      } else {
        router.push(`${pathname}`);
      }
      router.refresh()
    } else {
      toast.error("Error", { id: "post"});//トースト
      setIsDeleting(false);
    }
  }
  return(
    <div className='flex justify-center'>
      { isDeleting 
      ? <button 
        onClick={async() => {await _deletePost()}} 
        className='mt-4 w-[95%] py-1 border rounded-full border-rose-500' 
        disabled
        >
          <span className='text-rose-500 font-semibold'><MiniLoading /></span>
        </button>

      : <button 
        onClick={async() => {await _deletePost()}} 
        className='mt-1 w-[95%] py-1 border rounded-full border-rose-500 hover:bg-rose-100' 
        >
          <span className='text-rose-500 font-semibold'>投稿を削除する</span>
        </button>
      }
    </div>
  )
}