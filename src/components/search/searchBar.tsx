"use client"
import { searchInputs, SearchInputsType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<SearchInputsType>({ //zodで定義したスキーマから取り出した型を設定する
    resolver: zodResolver(searchInputs) //zodで定義したスキーマでバリデーションするため
  });

  const onSubmit: SubmitHandler<SearchInputsType> = async (data) => { //zodのバリデーションが通った時だけ実行される
    router.push(`/search?text=${data.text}&mode=post`);
  };

  return(
    <form className="flex w-[95%] my-2 ml-[2.5%] bg-slate-50 rounded-full" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="text" className="my-auto ml-2"><SearchOutlinedIcon sx={{ color: "gray" }}/></label>
      <input id="text" {...register("text")} className="w-full h-full py-3 bg-slate-50 rounded-r-full outline-none" placeholder="Search"/>
    </form>
  )
}

export default SearchBar