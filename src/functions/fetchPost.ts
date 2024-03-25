import { supabase } from "@/supabase";
import { PostType } from "@/types";
import { headers } from "next/headers";

const fetchPost = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`, {
    headers: headers()
  });
  if (!res.ok) {
    return null;
  }

  const json = await res.json();
  const post: PostType = json.post;
  let photoUrl: string | null = null;
  if(post && post.photo) {
    const { data } = supabase
      .storage
      .from('photos')
      .getPublicUrl(post.photo)
    photoUrl = data.publicUrl ?? null;
  }
  post.photoUrl = photoUrl;
  return post;
}

export default fetchPost;