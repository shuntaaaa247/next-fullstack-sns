import { supabase } from "@/supabase";
import { v4 as uuidv4 } from 'uuid'

export const createReply = async (userId: string, description: string, file: File | null | undefined, repliedToId: string): Promise<boolean> => {
  let fileName: string = "";
  if(file) {
    fileName = `img_${uuidv4()}_${file.name}`;
    const { data, error } = await supabase 
      .storage
      .from("photos")
      .upload(fileName, file); 
    if(error) {
      return false
    }
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/reply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify({
      description: description,
      autherId: Number(userId),
      photo: fileName ?? null,
      repliedToId: Number(repliedToId)
    })
  });

  if(res.ok) {
    return true;
  } else {
    return false;
  }
}