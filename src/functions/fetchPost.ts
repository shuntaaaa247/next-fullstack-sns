import { headers } from "next/headers";

const fetchPost = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/post/${id}`, {
    headers: headers()
  });
  if (!res.ok) {
    console.log("resはOKではありませんでした")
    console.log("res = ", res);
    return null;
  }
  const json = await res.json();
  return json.post;
}

export default fetchPost;