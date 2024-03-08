import { headers } from "next/headers";
import type { PostType } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


const fetchTimeline = async (userId: string): Promise<PostType[]> => {
  const res = await fetch(`${baseUrl}/api/post/${userId}/timeline`, {
    headers: headers() //バックエンド(GETメソッド)でSession情報取得するには、headers: headers()を追加
  });
  const json = await res.json();
  const timelinePosts: PostType[] = json.timelinePosts;
  return timelinePosts;
}

export default fetchTimeline