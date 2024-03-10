import { createPost } from "@/functions/createPost";
import { PostInputsType, postInputs } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast"; 
import { useRouter } from 'next/navigation';
import { useState } from "react";

type PostShareModalProps = {
  closeModalFunc: () => void
}

const PostShareModal = ({ closeModalFunc }: PostShareModalProps) => {
  const router = useRouter();
  const maxDescriptionLength = 140;
  const [descriptionLength, setDescriptionLength] = useState<number>(0);

  const { register, handleSubmit, formState: { errors } } = useForm<PostInputsType>({ //zodで定義したスキーマから取り出した型を設定する
    resolver: zodResolver(postInputs) //zodで定義したスキーマでバリデーションするため
  });

  const onSubmit: SubmitHandler<PostInputsType> = async (data) => { //zodのバリデーションが通った時だけ実行される
    toast.loading("Sending a post", { id: "postFromModal"});//トースト
    console.log(data);
    console.log(process.env.NEXT_PUBLIC_BASE_URL)
    const isSuccess = await createPost(data.description);
    if(isSuccess) {
      toast.success("Success", { id: "postFromModal"});//トースト
    } else {
      toast.error("Error", { id: "postFromModal"});//トースト
    }
    closeModalFunc();
    router.push("/");
    router.refresh();
  };

  console.log("errors", errors);

  return(
    <form className="h-[88%] flex-col" onSubmit={handleSubmit(onSubmit)}> 
      <Toaster />
      <textarea id="description" placeholder="what is happening?!" 
      className="w-full h-5/6 px-3 border-0 resize-none focus:outline-0"
      {...register("description")} /*registerの引数をzodで定義したスキーマのプロパティにすると、そのプロパティのバリデーションが適用される*/
      onChange={(e) => setDescriptionLength(e.target.value.length)}
      ></textarea>
      { errors.description?.message && (
        <p className="error-message text-rose-500">
          {errors.description?.message}
        </p>
      )}
      <div className="flex items-center h-1/6 border-t">
        <span 
        className={ maxDescriptionLength - descriptionLength >= 0 ? "p-1 text-blue-500 rounded-full bg-blue-50" : "p-1 text-rose-500 rounded-full bg-rose-50"}
        >
          {String(maxDescriptionLength - descriptionLength)}
        </span>
        <button className="bg-blue-500 text-white text-md font-semibold rounded-2xl px-4 py-1 ml-auto mr-3 hover:bg-blue-600">Post</button>
      </div>
    </form>
  )
}

export default PostShareModal