"use client"
import { createPost } from "@/functions/createPost";
import { PostInputsType, postInputs } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast"; 
import { useRouter } from 'next/navigation';

const PostShare = () => {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<PostInputsType>({ //zodで定義したスキーマから取り出した型を設定する
    resolver: zodResolver(postInputs) //zodで定義したスキーマでバリデーションするため
  });

  const onSubmit: SubmitHandler<PostInputsType> = async (data) => { //zodのバリデーションが通った時だけ実行される
    toast.loading("Sending a post", { id: "post"});//トースト
    console.log(data);
    console.log(process.env.NEXT_PUBLIC_BASE_URL)
    const isSuccess = await createPost(data.description);
    if(isSuccess) {
      toast.success("Success", { id: "post"});//トースト
    } else {
      toast.error("Error", { id: "post"});//トースト
    }
    router.push("/");
    router.refresh();
  };

  console.log("errors", errors);

  return(
    <form className="h-1/6" onSubmit={handleSubmit(onSubmit)}> 
    <Toaster />
      <textarea id="description" placeholder="what is happening?!" 
      className="w-full h-[65%] px-3 border-0 resize-none focus:outline-0"
      {...register("description")} /*registerの引数をzodで定義したスキーマのプロパティにすると、そのプロパティのバリデーションが適用される*/
      ></textarea>
      { errors.description?.message && (
        <p className="error-message">
          {errors.description?.message}
        </p>
      )}
      <hr className="mx-3"/>
      <div className="flex items-center h-[30%] border-b">
        <button className="bg-blue-500 text-white text-md font-semibold rounded-2xl px-4 py-1 ml-auto mr-3 hover:bg-blue-600">Post</button>
      </div>
    </form>
  )
}

export default PostShare