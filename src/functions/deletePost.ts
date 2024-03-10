const deletePost = async (postId: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post?userId=1&postId=${postId}`, {
    method: "DELETE",
  })

  return res.ok;
}

export default deletePost