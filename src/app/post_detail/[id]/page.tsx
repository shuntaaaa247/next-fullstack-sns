import fetchPost from "@/functions/fetchPost";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import type { PostType } from "@/types";
import Post from "@/components/post/post";
import LeftBar from "@/components/leftBar/leftbar";
import RightBar from "@/components/rightBar/rightBar";
import { Suspense } from "react";
import Loading from "@/components/loading/Loading";

const PostDetail = async ({ params }: { params: Params }) => {
  // const post: PostType | null = await fetchPost(params.id);

  return (
    <main className="flex justify-center">
      <LeftBar />
      <div className="h-screen w-6/12 flex flex-col">
        <div className="py-3 flex border-b">
          <p className="ml-10 font-semibold text-2xl">Post</p>
        </div>
        {/* { post 
        ? <div className="">
          <Suspense fallback={<div>Loading...</div>}>
            <Post post={post} from={"/post_detail/[id]"}/>
          </Suspense>
          </div> 
        : <h2>このページはご覧になれません</h2>
        } */}
        <Suspense fallback={<Loading />}>
          <MiddlePost postId={params.id} />
        </Suspense>
      </div>
      
      <RightBar />
    </main>
  )
}

export default PostDetail

type _PostProps = {
  postId: number
}

const MiddlePost = async ({ postId }: _PostProps) => {
  const post: PostType | null = await fetchPost(String(postId));
  return(
    <div>
      { post
      ? <Post post={post} from={"/post_detail/[id]"}/>
      : <h2>このページはご覧になれません</h2>
      }
    </div>
  )
}