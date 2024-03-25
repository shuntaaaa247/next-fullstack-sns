import { headers } from "next/headers";
import type { PostType } from "@/types";
import { supabase } from "@/supabase";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


export const fetchTimeline = async (userId: string): Promise<PostType[]> => {
  const res = await fetch(`${baseUrl}/api/post/${userId}/timeline`, {
    // headers: headers() //バックエンド(GETメソッド)でSession情報取得するには、headers: headers()を追加 <-vercelでは使用できなかった。
  });

  const json = await res.json();
  const timelinePosts: PostType[] = json.timelinePosts;

  if(res.ok) {
    console.log("きちんと取得できています");
    console.log(timelinePosts);
  } else {
    console.log("xxxxxxxきちんと取得できていませんXXXXXXXX");
  }
  
  if(!timelinePosts) {
    return []
  }

  for (const post of timelinePosts) {
    if(post.photo) {
      const { data } = supabase
        .storage
        .from("photos")
        .getPublicUrl(post.photo)
      post.photoUrl = data.publicUrl
    }
  }
  return timelinePosts;
}

export const fetchProfileTimeline = async (userId: string): Promise<PostType[]> => {
  const res = await fetch(`${baseUrl}/api/post/${userId}/profile_timeline`);
  const json = await res.json();
  const profileTimelinePosts: PostType[] = json.profileTimelinePosts;

  if(!profileTimelinePosts) {
    return []
  }

  for (const post of profileTimelinePosts) {
    if(post.photo) {
      const { data } = supabase
        .storage
        .from("photos")
        .getPublicUrl(post.photo)
      post.photoUrl = data.publicUrl
    }
  }
  return profileTimelinePosts
}