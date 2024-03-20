import { supabase } from "@/supabase";
import { PostType } from "@/types";

const deletePost = async (postId: number) => {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post?userId=1&postId=${postId}`, {
    method: "DELETE",
  });

  const json = await res.json();
  const deletedPost: PostType = json.deletedPost;
  console.log("json:", json);
  console.log("deletedPost:", deletedPost)
  if(deletedPost.photo) {
    const { data: removeData, error: removeError } = await supabase
      .storage
      .from("photos")
      .remove([deletedPost.photo])
    if(removeError) {
      alert("データベースから投稿画像を削除できませんでした。" + removeError.message);
      console.error(removeError.message)
    }
  }

  return res.ok;
}

export default deletePost