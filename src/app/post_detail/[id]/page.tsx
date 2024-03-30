import { supabase } from "@/supabase";
import { options } from "@/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Suspense } from "react";
import fetchPost from "@/functions/fetchPost";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import type { PostType } from "@/types";
import Post from "@/components/post/post";
import LeftBar from "@/components/leftBar/leftbar";
import RightBar from "@/components/rightBar/rightBar";
import Loading from "@/components/loading/Loading";
import { revalidatePath } from "next/cache";

const PostDetail = async ({ params }: { params: Params }) => {
  return(
    <Suspense fallback={<Loading />}>
      <PostDetailContent postId={params.id} />
    </Suspense>
  )
}

export default PostDetail

type PostDetailContentProps = {
  postId: number
}

const PostDetailContent = async ({ postId }: PostDetailContentProps) => {
  const post: PostType | null = await fetchPost(String(postId));
  const session = await getServerSession(options);
  let parentPost: PostType | null = null;
  if(post?.repliedToId) {
    parentPost = await fetchPost(String(post.repliedToId));
  }
  if(!session) {
    return(
      <div>サインインしてください</div>
    )
  }
  return(
    <main className="sm:flex md:justify-center mt-[60px] sm:mt-0">
      <LeftBar userId={session?.user.id}/>
      <div className="h-screen w-full sm:w-3/4 md:w-6/12 flex flex-col sm:ml-auto md:mx-auto">
        <div className="py-3 flex border-b">
          <p className="ml-10 font-semibold text-2xl">Post</p>
        </div>
        <div className="">
        { post?.repliedToId
          ? 
            parentPost 
              ? 
                <>
                  <Post post={parentPost} from={"/app"}/> 
                </>
              : <p>返信先の投稿が見つかりませんでした</p> 
          : <></>
        }
        </div>
        <div className="border-2">
        { post
          ? <Post post={post} from={"/post_detail/[id]"}/>
          : <h2>このページはご覧になれません</h2>
        }
        </div>
        {post && post.replies
        ? 
        <>
          <span className="text-xl font-medium border-b mt-2 pb-2 px-4">Replies</span>
          {(post.replies).map((reply: PostType) => {
            let photoUrl: string | null = null;
            if(reply && reply.photo) {
              const { data } = supabase
                .storage
                .from('photos')
                .getPublicUrl(reply.photo)
              photoUrl = data.publicUrl ?? null;
            }
            reply.photoUrl = photoUrl
            return(
              <div key={reply.id}>
                <Post post={reply} from={"/app"} />
              </div>
            )
          })}
        </>
        : <>replyなし</>
        }
        <div className="h-[100px] sm:h-1/5"></div>
      </div>
      <RightBar />
    </main>
  )
}

type repliesTimelineProps = {
  replies: PostType[]
}