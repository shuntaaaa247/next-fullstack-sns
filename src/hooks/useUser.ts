import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useUser = (userId: number) => {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`, fetcher);
  console.log("data", data)

  const user = data?.user ?? null
  return{ user, error, isLoading}
}