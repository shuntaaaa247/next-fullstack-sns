import { options } from "@/options";
import { getServerSession } from "next-auth";
import PostShare from "../components/timeline/postShare";
import type { PostType } from "@/types";
import { headers } from "next/headers";
import Post from "@/components/post/page";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const fetchUser = async (userId: string) => {
  const res = await fetch(`http://localhost:3000/api/user/${userId}`);
  const json = await res.json();
  const user = json.user;
  return user;
}

const fetchTimeline = async (userId: string): Promise<PostType[]> => {
  const res = await fetch(`${baseUrl}/api/post/${userId}/timeline`, {
    headers: headers() //バックエンド(GETメソッド)でSession情報取得するには、headers: headers()を追加
  });
  const json = await res.json();
  const timelinePosts: PostType[] = json.timelinePosts;
  return timelinePosts;
}

export default async function Home() {
  const session = await getServerSession(options);

  const user = await fetchUser(String(session?.user.id));

  const timelinePosts: PostType[] = await fetchTimeline(String(session?.user.id));

  console.log("timelinePosts:", timelinePosts);

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
          <p>accessToken: {user.accessToken}</p>
          <h2>タイムライン</h2>
          { timelinePosts.map((timelinePost: PostType) => {
            return (
              <div key={timelinePost.id}>
                <Post post={timelinePost}/>
              </div>
            )
          })}
        </div>
      </div>
      <div className="h-screen w-3/12">
      <p className="text-center">Rightbar</p>
      </div>
    </main>
  );
}
