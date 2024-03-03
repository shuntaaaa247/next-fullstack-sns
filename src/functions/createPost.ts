"use server"

import { options } from "@/options";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";


export const createPost = async (description: string) => {
  const session = await getServerSession(options);
  console.log("idちゃん:", session?.user.id); //vscodeのターミナルに出力される。

  // const headersList = headers();


  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, {
    method: "POST",
    // headers: Object.fromEntries(headers()),
    headers: { "Content-Type": "application/json" },
    // headers: headers(),
    // credentials: "include",
    body: JSON.stringify({
      description: description,
      autherId: session?.user.id
    })
  });

  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, {
  //   headers: headers()
  // })
  const json = await res.json();
  console.log("json", json);
}