import { options } from "@/options";
import { getServerSession } from "next-auth";
import Post from "@/components/post/post";
import fetchUser from "@/functions/fetchUser";
import { fetchTimeline, fetchProfileTimeline, fetchProfileReplies, fetchProfileLikePosts } from "@/functions/fetchTimeline";
import type { PostType } from "@/types";

type TimelineProps = {
  userId?: string | null,
  mode?: string | null,
}

const Timeline = async ({ userId, mode }: TimelineProps) => {
  const session = await getServerSession(options);
  const user = await fetchUser(String(session?.user.id));
  let timelinePosts: PostType[];
  if(userId) { //プロフィール画面用用タイムライン
    if(mode === "with_replies") {
      timelinePosts = await fetchProfileReplies(userId);
    } else if(mode === "with_likes") {
      timelinePosts = await fetchProfileLikePosts(userId);
    } else {
      timelinePosts = await fetchProfileTimeline(userId);
    }
  } else { //ホーム画面用タイムライン
    timelinePosts = await fetchTimeline(String(session?.user.id));
  }

  if(!timelinePosts || timelinePosts.length === 0) {
    return(
      <div>
        <p>投稿がありません</p>
      </div>
    )
  }

  return(
    <div className="sm:h-5/6">
      { timelinePosts.map((timelinePost: PostType) => {
        return (
          <div key={timelinePost.id}>
            <Post post={timelinePost} from={"/app"}/>
          </div>
        )
      })}
      <div className="h-[100px] sm:h-1/5"></div>
    </div>
  )
}

export default Timeline