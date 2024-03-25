import { options } from "@/options";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import Loading from "../loading/Loading";
import { getRandomUsers } from "@/functions/getRandomUsers";
import OtherUsers from "./otherUsers";


const RightBar = async () => {
  return(
    <div className="h-screen w-0 md:w-3/12 fixed right-0 border-l-2">
      <Suspense fallback={<Loading />}>
        <RightBarContent />
      </Suspense>
    </div>
  )
}

export default RightBar

const RightBarContent = async () => {
  const session = await getServerSession(options);
  const randomUsers = await getRandomUsers(3);
  const userAvatarImageUrls: string[] = []

  return(
    <>
      <div className="m-2 mt-5 rounded-xl bg-slate-100">
        <p className="text-2xl font-medium text-center pt-3">Users</p>
        { randomUsers
        ? randomUsers.map((user: any) => {
            return(
              <div key={user.id} className="flex">
                <OtherUsers user={user}/>
              </div>
            )
          })
        : <></>
        }
      <div className="h-3"></div>
      </div>
    </>
  )
}