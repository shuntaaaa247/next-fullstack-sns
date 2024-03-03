import { options } from "@/options";
import { getServerSession } from "next-auth";
import PostShare from "../components/timeline/postShare";

const fetchUser = async (userId: string) => {
  const res = await fetch(`http://localhost:3000/api/user/${userId}`);
  const json = await res.json();
  const user = json.user;
  return user;
}

export default async function Home() {
  const session = await getServerSession(options);

  const user = await fetchUser(String(session?.user.id));

  return (
    <main className="flex justify-center">
      <div className="h-screen w-3/12">
        <p className="text-center">Leftbar</p>
      </div>
      <div className="h-screen border-l-2 border-r-2 w-6/12 flex flex-col">
        <PostShare />
        <div className="h-5/6">
          <h1>ログイン中のユーザー</h1>
          <p>user id from session: {session?.user.id} | user id from user: {user.id}</p>
          <p>username: {user.username}</p>
          <p>email: {user.email}</p>
        </div>
      </div>
      <div className="h-screen w-3/12">
      <p className="text-center">Rightbar</p>
      </div>
    </main>
  );
}
