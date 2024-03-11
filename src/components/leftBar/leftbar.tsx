"use client"

import React, { useState } from 'react'
import Modal from 'react-modal'
import PostShareModal from './postShareModal'
import ClearIcon from '@mui/icons-material/Clear';

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

const LeftBar = () => {
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
    <div className="h-screen w-3/12 fixed left-0 border-r-2">
      <p className="text-center">Leftbar</p>
      <div className="flex justify-center">
      <button onClick={openModal} className="w-1/2 py-2 bg-blue-500 rounded-full text-white font-semibold text-2xl hover:bg-blue-600">Post</button>
      </div>
      <Modal
        contentLabel="Example Modal"
        isOpen={modalIsOpen}
        style={customStyles}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <div className='flex h-[12%]'>
          {/* <button  onClick={closeModal} className='p-1 rounded-full hover:bg-stone-100 font-light'><ClearIcon/></button> */}
          <button  onClick={closeModal}><ClearIcon/></button>
        </div>
          <PostShareModal closeModalFunc={closeModal}/>
      </Modal>
    </div>
  )
}

export default LeftBar