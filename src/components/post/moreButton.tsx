"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import { Toaster, toast } from "react-hot-toast"; 
import Modal from 'react-modal'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import deletePost from '@/functions/deletePost';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: "15%",
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
  const [modalIsOpen, setIsOpen] = useState<boolean>(false)

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
      <button className="mr-2">
        <MoreHorizIcon onClick={openModal} className="text-stone-500 hover:bg-stone-200 rounded-full"/>
      </button> 
      <Modal
        contentLabel="Example Modal"
        isOpen={modalIsOpen}
        style={customStyles}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <button onClick={closeModal}><ClearIcon /></button>
        <MorePostOptionsModal postId={postId}/>
      </Modal>
    </div>
  )
}

export default MoreButton

const MorePostOptionsModal = ({ postId }: MorePostOptionsModalProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const _deletePost = async () => {
    setIsDeleting(true);
    const result: boolean = await deletePost(postId);
    toast.loading("Deleting a post", { id: "deletePost"});//トースト
    if(result) {
      toast.success("Success", { id: "deletePost"});//トースト
      router.push(`${pathname}`);
      router.refresh()
    } else {
      toast.error("Error", { id: "post"});//トースト
    }
    setIsDeleting(false);
  }
  return(
    <div className='flex justify-center'>
      { isDeleting 
      ? <button 
        onClick={async() => {await _deletePost()}} 
        className='mt-4 w-[95%] py-1 border rounded-full border-rose-500' 
        disabled
        >
          <span className='text-rose-500 font-semibold'><DeleteOutlineOutlinedIcon/>投稿を削除する</span>
        </button>

      : <button 
        onClick={async() => {await _deletePost()}} 
        className='mt-4 w-[95%] py-1 border rounded-full border-rose-500 hover:bg-rose-100' 
        >
          <span className='text-rose-500 font-semibold'><DeleteOutlineOutlinedIcon/>投稿を削除する</span>
        </button>
      }
    </div>
  )
}