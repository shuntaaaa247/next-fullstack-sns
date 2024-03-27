"use client"

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import UserButton from './userButton';
import Modal from 'react-modal'
import PostShareModal from './postShareModal'
import ClearIcon from '@mui/icons-material/Clear';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ReplayIcon from '@mui/icons-material/Replay';
import MiniLoading from '../loading/miniLoading';

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const page: string = pahtname.split("/")[1];
  const url: string = pahtname;
  const searchText: string | null = searchParams.get("text");
  const searchMode: string | null = searchParams.get("mode");
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [isPwa, setIsPwa] = useState<boolean>(false);
  const [isReloading, setIsReloading] = useState<boolean>(true);

  useEffect(() => {
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

    if(window.matchMedia('(display-mode: standalone)').matches){
      setIsPwa(true);
    }

    setIsReloading(false);
  }, []);

  const goHome = () => {
    router.push("/");
    router.refresh();
  }

  const reload = () => {
    if(page === "search") {
      router.push(`${url}?text=${searchText ?? ""}&mode=${searchMode ?? ""}`)
      router.refresh();
    } else {
      router.push(`${url}`);
      router.refresh();
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
    <>
      <div className="h-screen w-0 sm:w-1/4 md:w-3/12 fixed left-0 border-r-2 flex flex-col invisible sm:visible">
        <div className='flex justify-center'>
          <button className="my-5 text-2xl font-medium" onClick={goHome}>NEXT FULLSTACK SNS</button>
        </div>
        <div className="flex justify-start md:ml-[25%]">
          <div className='flex flex-col sm: mx-auto md:mx-0'>
            { page === "" 
            ? 
              <button className="flex my-2 px-3 py-1 rounded-full bg-blue-50" onClick={() => {router.push("/"), router.refresh()}}>
                <HomeIcon fontSize='large'/>
                <span className='flex ml-1 text-2xl my-auto font-medium'>Home</span>
              </button>
            : <button className="flex my-2 px-3 py-1 rounded-full hover:bg-blue-50" onClick={() => {router.push("/"), router.refresh()}}>
                <HomeOutlinedIcon fontSize='large'/>
                <span className='flex ml-1 text-2xl font-medium'>Home</span>
              </button>
            }
            { page === "search" 
            ? <button className="flex my-2 px-3 py-1 rounded-full bg-blue-50" onClick={() => {router.push("/search"), router.refresh()}}>
                <SavedSearchIcon fontSize='large' />
                <span className='text-2xl ml-1 font-medium'>Search</span>
              </button>
            : <button className="flex my-2 px-3 py-1 rounded-full hover:bg-blue-50" onClick={() => {router.push("/search"), router.refresh()}}>
                <SearchOutlinedIcon fontSize='large'/>
                <span className='text-2xl ml-1 font-medium'>Search</span>
              </button>
            }
            { page === "profile"
            ? <button className="flex my-2 px-3 py-1 rounded-full bg-blue-50" onClick={() => {router.push(`/profile/${userId}`), router.refresh()}}>
                <PersonIcon fontSize='large'/>
                <span className='text-2xl ml-1 font-medium'>Profile</span>
              </button>
            : <button className="flex my-2 px-3 py-1 rounded-full hover:bg-blue-50" onClick={() => {router.push(`/profile/${userId}`), router.refresh()}}>
                <PersonOutlinedIcon fontSize='large'/>
                <span className='text-2xl ml-1 font-medium'>Profile</span>
              </button>
            }
          </div>
        </div>
        <button onClick={openModal} className="w-3/5 py-2 sm:mx-auto md:ml-[30%] mt-5 bg-blue-500 rounded-full text-white font-semibold text-2xl hover:bg-blue-600">Post</button>
        <div className='mt-auto mb-5 invisible sm:visible'>
          <UserButton userId={userId}/>
        </div>
        <Modal
          contentLabel="Example Modal"
          isOpen={modalIsOpen}
          style={customStyles}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
        >
          <div className='flex h-[12%]'>
            <button  onClick={closeModal}><ClearIcon/></button>
          </div>
            <PostShareModal closeModalFunc={closeModal} userId={userId}/>
        </Modal>
        
      </div>

      {/* モバイル画面用 */}
      {/* フッター */}
      <>
        <div className="w-full flex justify-around fixed bottom-0 py-3 bg-white border-t z-10 visible sm:invisible">
          { page === ""
          ? <button onClick={() => {router.push("/"), router.refresh()}}><HomeIcon fontSize='large'/></button>
          : <button onClick={() => {router.push("/"), router.refresh()}}><HomeOutlinedIcon fontSize='large'/></button>
          }
          { page === "search"
          ? <button onClick={() => {router.push("/search"), router.refresh()}}><SavedSearchIcon fontSize='large'/></button>
          : <button onClick={() => {router.push("/search"), router.refresh()}}><SearchOutlinedIcon fontSize='large'/></button>
          }
          { page === "profile"
          ? <button onClick={() => {router.push(`/profile/${userId}`), router.refresh()}}><PersonIcon fontSize='large'/></button>
          : <button onClick={() => {router.push(`/profile/${userId}`), router.refresh()}}><PersonOutlinedIcon fontSize='large'/></button>
          }
        </div>
        <button onClick={openModal} className="fixed z-10 bottom-[10%] right-5 bg-blue-500 w-16 h-16 rounded-full text-white font-semibold text-2xl hover:bg-blue-600 visible sm:invisible">
        <HistoryEduIcon fontSize='large'/>
        </button>
      </>

      {/* ヘッダー */}
      <>
        <div className='w-full h-[60px] flex fixed top-0 bg-white border-b z-10 visible sm:invisible'>
          <UserButton userId={userId}/>
          {isPwa 
          ? 
            isReloading ? <div className='my-auto'><MiniLoading /></div> : <button className='my-auto hover:bg-slate-100 rounded-full' onClick={reload}><ReplayIcon /></button>  // リロード中のローディングアニメーションは表示されなかった。
          : <></>
          }
          <span className='ml-auto text-lg font-semibold my-auto mr-5 hover:cursor-pointer' onClick={goHome}>NEXT FULLSTACK SNS</span>
        </div>
      </>
    </>
  )
}

export default LeftBar

