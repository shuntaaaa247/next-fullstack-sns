const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const fetchUser = async (userId: string) => {
  const res = await fetch(`http://localhost:3000/api/user/${userId}`);
  const json = await res.json();
  const user = json.user;
  return user;
}

export default fetchUser