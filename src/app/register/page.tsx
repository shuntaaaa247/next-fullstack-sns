"use client"
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

const Register = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const registUser = async (formData: FormData) => {
    console.log()
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password")
      })
    });

    const json = await res.json();

    if(res.ok && json.user) { //登録成功時
      router.push("/signin");
    } else { //登録失敗時
      setErrorMessage(json.message); 
    }
  }

  return(
    <main className='flex justify-center items-center h-screen'>
      <form action={registUser} className='p-10 shadow-2xl rounded-xl w-4/12'>
        <h1 className='text-center text-4xl font-semibold text-slate-800 mb-10'>Sign Up</h1>
        <div className='mb-5'>
          <label htmlFor="username">username</label>
          <br />
          <input id="username" name='username' type="username" placeholder='john' required 
          className='block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2d'
          />         
        </div>
        <div className='mb-5'>
          <label htmlFor="email">email</label>
          <br />
          <input id="email" name="email" type="email" placeholder='xxx@yyy.com' required
          className='block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2d'
          />
        </div>
        <div className='mb-5'>
          <label htmlFor="password">password</label>
          <br />
          <input id="password" name="password" type='password' placeholder='password' required
          className='block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2d'
          />
        </div>
        <p className='text-rose-600'>{errorMessage}</p>
        <div className='flex justify-center mt-10'>
          <button className='bg-blue-600 text-white text-md px-4 py-2 rounded-md hover:bg-blue-700'>サインアップ</button>
        </div>
      </form>
    </main>
  )
}

export default Register