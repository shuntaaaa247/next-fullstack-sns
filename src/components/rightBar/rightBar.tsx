import fetchUser from "@/functions/fetchUser";
import { options } from "@/options";
import { getServerSession } from "next-auth";

const RightBar = async () => {
  // const session = await getServerSession(options);
  // const user = await fetchUser(String(session?.user.id));
  return(
    <div className="h-screen w-3/12 fixed right-0 border-l-2">
      {/* <p className="text-center">Rightbar</p>
      <h1>ログイン中のユーザー</h1>
      <p>user id from session: {session?.user.id} | user id from user: {user.id}</p>
      <p>username: {user.username}</p>
      <p>email: {user.email}</p>
      <p>accessToken: {user.accessToken}</p> */}
    </div>
  )
}

export default RightBar