import { supabase } from "@/supabase";
import { v4 as uuidv4 } from 'uuid'

const editProfile = async (id: string, newUsername: string | null, newIntroduction: string | null, file: File | null | undefined, prevFileName: string | null): Promise<boolean> => {
  let fileName = "";
  if(file) { //新しいアイコン画像をsupabaseにアップロード
    fileName = `img_${uuidv4()}_${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase 
      .storage
      .from("avatars")
      .upload(fileName, file); 
    if(uploadError) {
      alert("エラーが発生しました");
      return false
    }
  }
  if(file && prevFileName) { //新しいアイコンが設定される場合はこれまでのアイコン画像を削除
    const { data: removeData, error: removeError } = await supabase
      .storage
      .from("avatars")
      .remove([prevFileName])
    if(removeError) {
      alert("エラーが発生しました");
      return false
    }
  }

  if(!file && !fileName) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        newUsername: newUsername,
        newIntroduction: newIntroduction,
        newAvatar: null
      })
    })
    return res.ok
  }
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      newUsername: newUsername,
      newIntroduction: newIntroduction,
      newAvatar: fileName
    })
  })
  return res.ok
}

export default editProfile
