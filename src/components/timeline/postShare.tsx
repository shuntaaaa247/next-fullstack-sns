"use client"
import { createPost } from "@/functions/createPost";
import { PostInputsType, postInputs } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast"; 
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Image from "next/image";
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

type PostShareProps = {
  userId: string
}

const PostShare = ({ userId }: PostShareProps) => {
  const router = useRouter();
  const maxDescriptionLength = 140;
  const [descriptionLength, setDescriptionLength] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const { register, handleSubmit, formState: { errors } } = useForm<PostInputsType>({ //zodで定義したスキーマから取り出した型を設定する
    resolver: zodResolver(postInputs) //zodで定義したスキーマでバリデーションするため
  });

  const onSubmit: SubmitHandler<PostInputsType> = async (data) => { //zodのバリデーションが通った時だけ実行される
    toast.loading("Sending a post", { id: "post"});//トースト
    const isSuccess = await createPost(userId, data.description, file);
    if(isSuccess) {
      toast.success("Success", { id: "post"});//トースト
    } else {
      toast.error("Error", { id: "post"});//トースト
    }
    setFile(null);
    setPreview("");
    router.push("/");
    router.refresh();
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(window.URL.createObjectURL(e.target.files[0]))
    } else {
      setFile(null);
      setPreview("");
    }
  }


  console.log("errors", errors);

  return(
    <form className="h-0 sm:h-1/6 invisible sm:visible" onSubmit={handleSubmit(onSubmit)}> 
    <Toaster />
      <textarea id="description" placeholder="what is happening?!" 
      className="w-full h-[65%] px-3 border-0 resize-none focus:outline-0"
      {...register("description")} /*registerの引数をzodで定義したスキーマのプロパティにすると、そのプロパティのバリデーションが適用される*/
      onChange={(e) => setDescriptionLength(e.target.value.length)}
      ></textarea>
      { errors.description?.message && (
        <p className="error-message">
          {/* {errors.description?.message} エラーメッセージは表示させない*/} 
        </p>
      )}
      <div className="flex justify-between border-y">
        <span className={ maxDescriptionLength - descriptionLength >= 0 ? "ml-1 my-1 p-1 text-blue-500 rounded-full bg-blue-50" : "p-1 text-rose-500 rounded-full bg-rose-50"}>
          {String(maxDescriptionLength - descriptionLength)}
        </span>
        <div className="flex mr-auto ml-2">
          <div className="flex flex-col align-middle">
            <label className="my-auto p-1 rounded-full hover:bg-slate-100" htmlFor="photo"><PhotoSizeSelectActualOutlinedIcon /></label>
            <input id="photo" type="file" accept=".png, .jpg, jpeg" {...register("photo")} onChange={handleChangeFile} className="hidden"/>
          </div>
            { preview && file 
            ? 
              <div className="flex">
                <div className="relative h-[35px] w-[35px] mr-auto my-auto ml-1">
                <Image src={preview} alt="photo" fill objectFit="cover" className="border rounded-md"/>
                </div>
                <ClearOutlinedIcon sx={{ fontSize: 15 }} className="bg-slate-100 rounded-full my-auto ml-1 hover:cursor-pointer hover:bg-slate-200" onClick={() => {setPreview(""), setFile(null)}}/>
              </div>
            : <></>
            }
        </div>
        <div className="flex items-center h-[30%] my-1">
          <button className="bg-blue-500 text-white text-md font-semibold rounded-2xl px-4 py-1 ml-auto mr-3 hover:bg-blue-600">Post</button>
        </div>
      </div>
    </form>
  )
}

export default PostShare