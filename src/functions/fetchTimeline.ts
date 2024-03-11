import { headers } from "next/headers";
import type { PostType } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


export const fetchTimeline = async (userId: string): Promise<PostType[]> => {
  const res = await fetch(`${baseUrl}/api/post/${userId}/timeline`, {
    headers: headers() //バックエンド(GETメソッド)でSession情報取得するには、headers: headers()を追加
  });
  const json = await res.json();
  const timelinePosts: PostType[] = json.timelinePosts;
  return timelinePosts;
}

export const fetchProfileTimeline = async (userId: string): Promise<PostType[]> => {
  const res = await fetch(`${baseUrl}/api/post/${userId}/profile_timeline`);
  const json = await res.json();
  const profileTimelinePosts: PostType[] = json.profileTimelinePosts;
  return profileTimelinePosts
}