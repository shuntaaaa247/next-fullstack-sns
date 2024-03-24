import { supabase } from "@/supabase";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const fetchUser = async (userId: string) => {
  const res = await fetch(`${baseUrl}/api/user/${userId}`);
  const json = await res.json();
  const user = json.user;
  let avatarUrl: string | null = null;

  if(user) {
    const { data } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(user.avatar)
    avatarUrl = data.publicUrl ?? null;
  }
  return {user, avatarUrl};
}

export default fetchUser