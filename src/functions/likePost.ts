export const likePost = async (postId: Number, userId: Number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/like?postId=${postId}&userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  });

  return res.ok;
}

export const deleteLike = async (postId: Number, userId: Number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/like?postId=${postId}&userId=${userId}`, {
    method: "DELETE",
  })

  const json = await res.json();
  console.log(json);
  return res.ok;
}