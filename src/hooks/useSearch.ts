import type { PostType } from "@/types"
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useSearchPost = (rawText: string) => {
  const text = rawText.replace("　", " "); // 半角スペースに変換
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/search?text=${text}`, fetcher);
  console.log("data :", data);

  const posts: PostType[] = data?.results ?? null
  return { posts, error, isLoading };
}

export const useSearchUser = (rawText: string) => {
  const text = rawText.replace("　", " ");
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/search?text=${text}`, fetcher);
  console.log("data: ", data);
  const users = data?.results ?? null
  return { users, error, isLoading };
}