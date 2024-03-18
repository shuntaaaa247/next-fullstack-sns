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

const Profile = async ({ params }: { params: Params }) => {
  return(
    <Suspense fallback={<Loading />}>
      <ProfileContent userId={ params.id } />
    </Suspense>
  )
}

export default Profile

type ProfileContentProps = {
  userId: string
}

const ProfileContent = async ({ userId }: ProfileContentProps) => {
  const session = await getServerSession(options);
  const user = await fetchUser(userId);

  if(!session) {
    return(
      <div>
      サインインしてください
    </div>
    )
  }

  return(
    <main className="flex justify-center">
      <LeftBar userId={session?.user.id}/>
      <div className="h-screen w-6/12 flex flex-col">
        { user && session ? 
        <div>
          <ProfileInfo user={user} signedInUserId={Number(session?.user.id)} />
            <Suspense fallback={<Loading />}>
          <Timeline userId={user.id}/>
          </Suspense>
        </div> :
        <p>ユーザーが見つかりませんでした</p> 
        }
      </div>
      <RightBar />
    </main>
  )
}