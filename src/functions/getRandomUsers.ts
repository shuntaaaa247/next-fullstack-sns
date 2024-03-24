export const getRandomUsers = async(num: number): Promise<[] | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/random?num=${num}`);
  const json = await res.json();
  const randomUsers = json.randomUsers;
  if(res.ok && randomUsers) {
    return randomUsers
  } else {
    return null
  }
}