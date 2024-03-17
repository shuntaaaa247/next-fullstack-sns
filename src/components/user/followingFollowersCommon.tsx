import UserList from "./userList";
import Link from "next/link";

type FollowingFollowersCommonProps = {
  mode: string,
  targetUserId: string
}

const FollowingFollowersCommon = async ({ mode, targetUserId }: FollowingFollowersCommonProps) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/follow?id=${targetUserId}&mode=${mode}`);
  const json = await res.json()
  const followers = json.users;
  const targetUsername = json.targetUsername;

  return(
    <div>
      <p className="text-2xl font-semibold my-2 ml-7">{targetUsername}</p>
      <div className="flex border-y">
        <Link href={`/following_list/${targetUserId}`} className={mode === "following" ? "text-center w-1/2 py-2 border-r font-semibold hover:bg-blue-50" : "text-center w-1/2 py-2 border-r hover:bg-blue-50" }>
          フォロー中
        </Link>

        <Link href={`/followers_list/${targetUserId}`} className={mode === "followers" ? "text-center w-1/2  py-2 border-r font-semibold hover:bg-blue-50" : "text-center w-1/2  py-2 border-r hover:bg-blue-50"}>
          フォロワー
        </Link>
      </div>
      <UserList mode="followers" following={null} followers={followers}/>
    </div>
  )
}

export default FollowingFollowersCommon