import { supabase } from "@/supabase";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useUser = (userId: number) => {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`, fetcher);
  const user = data?.user ?? null
  let avatarUrl: string | null = null;

  if(user && user.avatar) {
    const { data } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(user.avatar)
    avatarUrl = data.publicUrl ?? null;
  }

  return{ user, avatarUrl, error, isLoading}
}