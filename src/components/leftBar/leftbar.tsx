"use client"

import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import Modal from 'react-modal'
import PostShareModal from './postShareModal'
import ClearIcon from '@mui/icons-material/Clear';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';

type LeftBarProps = {
  userId: string
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

const LeftBar = ({ userId }: LeftBarProps) => {
  const pahtname = usePathname();
  const router = useRouter();
  const page: string = pahtname.split("/")[1]
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
      <div className='flex justify-center'>
        <button className="my-5 text-2xl font-medium">NEXT FULLSTACK SNS</button>
      </div>
      <div className="flex justify-start ml-[30%]">
        <div className='flex flex-col'>
          { page === "" 
          ? <button className="flex my-2 px-3 py-1 rounded-full bg-blue-50" onClick={() => router.push("/")}>
              <HomeIcon fontSize='large'/>
              <span className='flex ml-1 text-2xl font-medium'>Home</span>
            </button>
          : <button className="flex my-2 px-3 py-1 rounded-full hover:bg-blue-50" onClick={() => router.push("/")}>
              <HomeOutlinedIcon fontSize='large'/>
              <span className='flex ml-1 text-2xl font-medium'>Home</span>
            </button>
          }
          { page === "search" 
          ? <button className="flex my-2 px-3 py-1 rounded-full bg-blue-50" onClick={() => router.push("/search")}>
              <SavedSearchIcon fontSize='large' />
              <span className='text-2xl ml-1 font-medium'>Search</span>
            </button>
          : <button className="flex my-2 px-3 py-1 rounded-full hover:bg-blue-50" onClick={() => router.push("/search")}>
              <SearchOutlinedIcon fontSize='large'/>
              <span className='text-2xl ml-1 font-medium'>Search</span>
            </button>
          }
          { page === "profile"
          ? <button className="flex my-2 px-3 py-1 rounded-full bg-blue-50" onClick={() => router.push(`/profile/${userId}`)}>
              <PersonIcon fontSize='large'/>
              <span className='text-2xl ml-1 font-medium'>Profile</span>
            </button>
          : <button className="flex my-2 px-3 py-1 rounded-full hover:bg-blue-50" onClick={() => router.push(`/profile/${userId}`)}>
              <PersonOutlinedIcon fontSize='large'/>
              <span className='text-2xl ml-1 font-medium'>Profile</span>
            </button>
          }
        </div>
      </div>
      <button onClick={openModal} className="w-3/5 py-2 ml-[30%] mt-5 bg-blue-500 rounded-full text-white font-semibold text-2xl hover:bg-blue-600">Post</button>
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