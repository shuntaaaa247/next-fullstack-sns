"use server"

import { options } from "@/options";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";

export const createPost = async (description: string): Promise<boolean> => {
  const session = await getServerSession(options);
  console.log("idちゃん:", session?.user.id); //vscodeのターミナルに出力される。

  const headersList = headers();
  // const csrfToken = await getCsrfToken()
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, {
    method: "POST",
    headers: { //apiルートでgetServerSessionによるsessionができない。このheadersに問題があるのか。
      "Content-Type": "application/json", 
      // "Authorization": `Bearer ${session?.user.accessToken}`
    },
    body: JSON.stringify({
      description: description,
      autherId: session?.user.id
    })
  });

  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, { 
  //   headers: headers() //GET APIの中だとheadersをheaderes()にするとAPI側でgetServerSessionができる。
  // })
  // const json = await res.json();
  // console.log("json", json);

  if(res.ok) {
    return true;
  } else {
    return false;
  }
}