const editProfile = async (id: string, newUsername: string | null, newIntroduction: string | null): Promise<boolean> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      newUsername: newUsername,
      newIntroduction: newIntroduction
    })
  })

  const json = await res.json()
  console.log("json:", json);
  return res.ok
}

export default editProfile
