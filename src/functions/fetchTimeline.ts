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

export const fetchProfileReplies = async (userId: string): Promise<PostType[]> => {
  const res = await fetch(`${baseUrl}/api/post/${userId}/profile_timeline/replies`);
  const json = await res.json();
  const profileReplies: PostType[] = json.profileReplies;

  if(!profileReplies) {
    return []
  }

  for (const reply of profileReplies) {
    if(reply.photo) {
      const { data } = supabase
        .storage
        .from("photos")
        .getPublicUrl(reply.photo)
      reply.photoUrl = data.publicUrl
    }
  }
  return profileReplies;
}

export const fetchProfileLikePosts = async (userId: string): Promise<PostType[]> => {
  const res = await fetch(`${baseUrl}/api/post/${userId}/profile_timeline/likes`);
  const json = await res.json();
  const profileLikePosts: PostType[] = json.profileLikePosts;

  if(!profileLikePosts) {
    return []
  }

  for (const reply of profileLikePosts) {
    if(reply.photo) {
      const { data } = supabase
        .storage
        .from("photos")
        .getPublicUrl(reply.photo)
      reply.photoUrl = data.publicUrl
    }
  }
  return profileLikePosts;

}