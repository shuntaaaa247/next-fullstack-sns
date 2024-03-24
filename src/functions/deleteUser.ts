export const deleteUser = async(userId: string): Promise<boolean> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
    method: "DELETE",
    body: JSON.stringify({
      userId: userId
    })
  });
  const json = await res.json();
  const message = json.message;
  console.log("================================")
  console.log(message)
  console.log("================================")
  return res.ok;
}