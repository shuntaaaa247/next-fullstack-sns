export const followUser = async (followerId: number, followingId: number): Promise<boolean> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/follow`, {
    method: "POST",
    body: JSON.stringify({
      followerId: String(followerId),
      followingId: String(followingId)
    })
  })

  const json = await res.json()
  console.log(json);
  return res.ok;
}

export const unFollowUser = async (followerId: number, followingId: number): Promise<boolean> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/follow`, {
    method: "DELETE",
    body: JSON.stringify({
      followerId: String(followerId),
      followingId: String(followingId)
    })
  })

  return res.ok
}