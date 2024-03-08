import { options } from "@/options";
import { getServerSession } from "next-auth";
import PostShare from "../components/timeline/postShare";
import type { PostType } from "@/types";
import { headers } from "next/headers";
import Post from "@/components/post/page";
import LeftBar from "@/components/leftBar/leftbar";
import RightBar from "@/components/rightBar/rightBar";
import  fetchUser from "@/functions/fetchUser";
import fetchTimeline from "@/functions/fetchTimeline";


export default async function Home() {
  const session = await getServerSession(options);

  const user = await fetchUser(String(session?.user.id));

  const timelinePosts: PostType[] = await fetchTimeline(String(session?.user.id));

  console.log("timelinePosts:", timelinePosts);

  return (
    <main className="flex justify-center">
      <LeftBar />
      <div className="h-screen w-6/12 flex flex-col">
        <PostShare />
        <div className="h-5/6">
          { timelinePosts.map((timelinePost: PostType) => {
            return (
              <div key={timelinePost.id}>
                <Post post={timelinePost}/>
              </div>
            )
          })}
        </div>
      </div>
      <RightBar />
    </main>
  );
}
