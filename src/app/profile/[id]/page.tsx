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
  const session = await getServerSession(options);
  const user = await fetchUser(params.id);

  return(
    <main className="flex justify-center">
      <LeftBar />
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

export default Profile

// type MiddleProfileInfoProps = {
//   user: any
// }

// "use client"
// const MiddleProfileInfo = ({ user }: MiddleProfileInfoProps) => {
//   return(
//     <SessionProvider>
//       <ProfileInfo user={user}/>
//     </SessionProvider>
//   )
// }