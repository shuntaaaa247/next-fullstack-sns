"use client";

import {SessionProvider, signIn, signOut} from "next-auth/react";
import IsSignin from "./isSignin";
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from "next/navigation";
import { useState } from "react";

type Inputs = {
  email: string,
  password: string
}

// ログインボタン
export const SigninButton = () => {
  const router = useRouter();
  const [isInputError, setIsInputError] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmitFunc: SubmitHandler<Inputs> = async (data) => {
    console.log("data = ", data);
    const result = await signIn("user", { //第一引数はoptions.tsで指定したcredentialsProvaiderのid
      redirect: false,
      email: data.email,
      password: data.password
    });

    if (result?.error) {
      // ログイン失敗時処理
      console.log("ログイン失敗");

      const res = await fetch("http://localhost:3000/api/auth/get_user_with_signin", {
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
      console.log("result = ", result)
      alert("成功")
    }
  }

  return (
    <div className="p-10 shadow-2xl rounded-xl w-4/12">
      <h1 className='text-center text-4xl font-semibold text-slate-800 mb-10'>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmitFunc)}>
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
        { isInputError ? <p className="text-rose-600">メールアドレス、またはパスワードが違います</p> : <></>}
        <div className='flex justify-center mt-10'>
          <button type='submit' className='bg-blue-600 text-white text-md px-4 py-2 rounded-md hover:bg-blue-700'>サインイン</button>
        </div>
      </form>
      {/* <SessionProvider>
        <IsSignin />
      </SessionProvider> */}
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