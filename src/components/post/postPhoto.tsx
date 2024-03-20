"use client"

import Image from "next/image"
import { useState } from "react"
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('body') // bodyなど任意の要素に変更OK

type PostPhotoProps = {
  photoUrl: string
}

const PostPhoto = ({ photoUrl }: PostPhotoProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  function openModal() {
    setModalIsOpen(true)
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  return(
    <>
      <div className="relative w-[95%] h-[300px]">
        <Image src={photoUrl} layout="fill" objectFit="cover" className="border-2 rounded-md cursor-pointer" alt="photo" onClick={openModal}/>
      </div>
      <Modal
        contentLabel="Photo Modal"
        isOpen={modalIsOpen}
        style={customStyles}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        {/* <div className="relative h-screen w-[70vw] "> */}
        <div className="relative h-screen w-screen ">
        <button onClick={closeModal}>
        <Image src={photoUrl} layout="fill" objectFit="contain" className="rounded-md" alt="photo"/>
        </button>
        </div>
        {/* <div className="flex">
          <button onClick={closeModal} className="mb-auto">close</button>
          <div className="relative h-screen w-[85vw] ">
          <Image src={photoUrl} layout="fill" objectFit="contain" className="rounded-md" alt="photo"/>
          </div>
        </div> */}
      </Modal>
    </>
  )
}

export default PostPhoto