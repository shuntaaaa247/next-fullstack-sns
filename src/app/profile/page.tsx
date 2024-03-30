import { getServerSession } from "next-auth";
import { options } from "@/options";
import LeftBar from "@/components/leftBar/leftbar";
import RightBar from "@/components/rightBar/rightBar";
import fetchUser from "@/functions/fetchUser";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Suspense } from "react";
import Timeline from "@/components/timeline/timeline";
import Loading from "@/components/loading/Loading";
import ProfileInfo from "@/components/timeline/profileInfo";
import Link from "next/link";

const Profile = async ({ searchParams }: { searchParams: {id: string, mode: string} }) => {
  return(
    <Suspense fallback={<Loading />}>
      <ProfileContent userId={ searchParams.id } mode={searchParams.mode}/>
    </Suspense>
  )
}

export default Profile

type ProfileContentProps = {
  userId: string,
  mode: string
}

const ProfileContent = async ({ userId, mode }: ProfileContentProps) => {
  const session = await getServerSession(options);
  const { user, avatarUrl } = await fetchUser(userId);

  if(!session) {
    return(
      <div>
      サインインしてください
    </div>
    )
  }

  return(
    <main className="sm:flex md:justify-center">
      <LeftBar userId={session?.user.id}/>
      <div className="h-screen w-full sm:w-3/4 md:w-6/12 mt-[60px] sm:mt-0 flex flex-col sm:ml-auto md:mx-auto">
        { user && session ? 
        <>
          <ProfileInfo user={user} avaterUrl={avatarUrl} signedInUserId={Number(session?.user.id)} />
          <div className="flex justify-around border-b">
            <Link href={`/profile?id=${userId}`} className={`w-1/3 py-1 text-lg font-medium text-center hover:bg-slate-100 ${ mode !== "with_replies" && mode !== "with_likes" ? "border-b-2 border-b-blue-500" : ""} `}>Posts</Link>
            <Link href={`/profile?id=${userId}&mode=with_replies`} className={`w-1/3 py-1 text-lg font-medium text-center hover:bg-slate-100 ${mode === "with_replies" ? "border-b-2 border-b-blue-500" : ""}`}>Replies</Link>
            <Link href={`/profile?id=${userId}&mode=with_likes`} className={`w-1/3 py-1 text-lg font-medium text-center hover:bg-slate-100 ${mode === "with_likes" ? "border-b-2 border-b-blue-500" : ""}`}>Likes</Link>
          </div>
          <Suspense fallback={<Loading />}>
            <Timeline userId={user.id} mode={mode}/>
          </Suspense>
        </> :
        <p>ユーザーが見つかりませんでした</p> 
        }
      </div>
      <RightBar />
    </main>
  )
}