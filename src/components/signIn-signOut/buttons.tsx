"use client";

import { signIn, signOut } from "next-auth/react";
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import MiniLoading from "../loading/miniLoading";

type Inputs = {
  email: string,
  password: string
}

// ログインボタン
export const SigninButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInputError, setIsInputError] = useState<boolean>(false);
  const [boxWidth, setBoxWidth] = useState<string>("1/2 mx-[30%]");
  const { register, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    const windowWidth = window.innerWidth;
    if(windowWidth) {
      // if(windowWidth < 1100)
      if(windowWidth < 640) {
        setBoxWidth("full mx-5");
      } else if (windowWidth < 850) {
        setBoxWidth("full mx-32")
      }else if(windowWidth < 1050) {
        setBoxWidth("1/2");
      }
    }
  }, [])

  const onSubmitFunc: SubmitHandler<Inputs> = async (data) => {
    setIsInputError(false);
    setIsLoading(true)
    const result = await signIn("user", { //第一引数はoptions.tsで指定したcredentialsProvaiderのid
      redirect: false,
      email: data.email,
      password: data.password
    });

    if (result?.error) {
      // ログイン失敗時処理

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/get_user_with_signin`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
      })

      if(res.status === 401) {
        setIsInputError(true);
      }

    } else {
      // ログイン成功時トップページへリダイレクト
      router.push("/")
    }
    setIsLoading(false);
  }

  return (
    <div className={`p-10 shadow-2xl rounded-xl w-${boxWidth}`}>
      <h1 className='text-center text-4xl font-semibold text-slate-800 mb-10'>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmitFunc)}>
      {/* setIsLoading(true),  */}
        <div className='mb-5'>
          <label htmlFor="email">email</label>
          <br />
          <input id="email" type="email" {...register("email", {required: true })} placeholder='xxx@yyy.com'
          className='block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2d'
          />
        </div>
        <div className='mb-5'>
          <label htmlFor="password">password</label>
          <br />
          <input id="password" type='password' {...register("password", {required: true })} placeholder='password'
          className='block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2d'
          />
        </div>
        { isInputError && !isLoading ? <p className="text-rose-600">メールアドレス、またはパスワードが違います</p> : <></>}
        <div className='flex justify-center mt-10'>
          { isLoading
          ? <MiniLoading />
          : <button type='submit' className='bg-blue-600 text-white text-md px-4 py-2 rounded-md hover:bg-blue-700'>サインイン</button>
          }
          
        </div>
        <div className="flex justify-center">
          <Link href={"/register"} className="text-blue-500 hover:underline mt-5">新規アカウントを作成しますか？</Link>
        </div>
        <button className="text-blue-500 hover:underline mt-5" onClick={() => alert("以下の入力値でサインインしてください。\nemail:guest@guest.com\npassword:guest")}>ゲスト用アカウントでサインインしますか？</button>
      </form>
    </div>
  );
};

// ログアウトボタン
export const SignoutButton = () => {
  return (
    <div>
      <br />
      <button style={{marginRight: 10}} onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
};