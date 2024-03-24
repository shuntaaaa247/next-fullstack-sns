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
            <Suspense fallback={<Loading />}>
          <Timeline userId={user.id}/>
          </Suspense>
        </> :
        <p>ユーザーが見つかりませんでした</p> 
        }
      </div>
      <RightBar />
    </main>
  )
}