"use client"
import { useEffect, useState } from "react";
import {useSession} from "next-auth/react";
import { SessionProvider } from "next-auth/react"
import { LikeType, PostType } from "@/types";
import { likePost, deleteLike } from "@/functions/likePost";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import Modal from 'react-modal'
import PostShareModal from "../leftBar/postShareModal";
import likeBorderIcon from "../../../public/svg/like-border.svg";
import likeFillIcon from "../../../public/svg/like-fill.svg";
import replyIcon from "../../../public/svg/comment.svg"
import clearIcon from "../../../public/svg/clear.svg"

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

type PostOptionsProps = {
  postId: Number,
  likes: LikeType[],
  replies: PostType[] | null
}

const PostOptions = ({ postId, likes, replies }: PostOptionsProps) => {

  return(
    <SessionProvider>
      <PostOptionContent postId={postId} likes={likes} replies={replies}/>
    </SessionProvider>
  )
}

export default PostOptions

const PostOptionContent = ({ postId, likes, replies }: PostOptionsProps) => {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeConunt, setLikeCount] = useState<number>(likes?.length ?? 0);
  const [replyCount, setReplyCount] = useState<number>(replies?.length ?? 0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const handleLike = async () => {
    if(isLiked) {
      setLikeCount(likeConunt - 1);
      setIsLiked(!isLiked);
      const deleteResult: boolean = await deleteLike(postId, Number(session?.user.id) ?? null);
      if(deleteResult) {
        router.refresh();
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
        router.refresh();
      } else {
        setLikeCount(likeConunt - 1)
        setIsLiked(!isLiked);
        alert("いいねが押せませんでした。")
      }
    }
  }

  const handleReplyIcon = () => {
    if(pathname === `/post_detail/${postId}`) {
      openModal()
    } else {
      router.push(`/post_detail/${postId}`);
      router.refresh()
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
    const windowInnerWidth: number | null | undefined = window.innerWidth

    if(windowInnerWidth >= 1100 || !windowInnerWidth) { 
    } else if (windowInnerWidth >= 900) {
      customStyles.content.width = "60%";
    } else if (windowInnerWidth >= 750) {
      customStyles.content.width = "70%";
    } else if (windowInnerWidth >= 640) {
      customStyles.content.width = "80%";
    } else {
      customStyles.content.width = "90%";
    }
  }, [likes, session?.user.id])

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false)
  }

  return(
    <>
      <div className="flex">
        <button className="mb-1" onClick={() => handleReplyIcon()}>
          <Image src={replyIcon} alt="reply" width={23} height={23}/>
        </button>
        <span className="ml-1 mr-10">{ replyCount }</span>

        { isLiked 
        ? 
        <button onClick={() => handleLike()} className="mb-1">
          <Image src={likeFillIcon} alt="like" width={27} height={27}/>
        </button> 
        : 
        <button onClick={() => handleLike()} className="mb-1">
          <Image src={likeBorderIcon} alt="like" width={27} height={27}/>
        </button> 
        }
        <span className="ml-1">{ likeConunt }</span>
      </div>
      <Modal
        contentLabel="Example Modal"
        isOpen={modalIsOpen}
        style={customStyles}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <div className='flex h-[12%]'>
          <button  onClick={closeModal}><Image src={clearIcon} alt="clear" width={15} height={15} /></button>
          <span className="mx-auto my-auto text-xl font-medium">Reply Form</span>
        </div>
      <PostShareModal closeModalFunc={closeModal} userId={String(session?.user.id)} replyToId={String(postId)}/>
    </Modal>
  </>
  )
}