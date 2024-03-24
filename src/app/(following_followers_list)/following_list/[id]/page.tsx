import { options } from "@/options";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Suspense } from "react";
import LeftBar from "@/components/leftBar/leftbar";
import Loading from "@/components/loading/Loading";
import RightBar from "@/components/rightBar/rightBar";
import FollowingFollowersCommon from "@/components/user/followingFollowersCommon";

const Following = async ({ params }: { params: Params }) => {
  return(
    <Suspense fallback={<Loading />}>
      <FollowingContent targetUserId={params.id}/>
    </Suspense>
  )
}

export default Following

type FollowingContentProps = {
  targetUserId: string
}

const FollowingContent = async ({ targetUserId }: FollowingContentProps) => {
  const session = await getServerSession(options);

  if(!session) {
    return(
      <div>サインインしてください</div>
    )
  }

  return(
    <main className="sm:flex md:justify-center">
    <LeftBar userId={session?.user.id} />
    <div className="h-screen w-full sm:w-3/4 md:w-6/12 mt-[60px] sm:mt-0 flex flex-col sm:ml-auto md:mx-auto">
      <Suspense fallback={<Loading />}>
        <FollowingFollowersCommon mode="following" targetUserId={targetUserId}/>
      </Suspense>
      </div>
      <RightBar />
    </main>
  )
}