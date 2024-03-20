import { options } from "@/options";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import PostShare from "../components/timeline/postShare";
import LeftBar from "@/components/leftBar/leftbar";
import RightBar from "@/components/rightBar/rightBar";
import Timeline from "@/components/timeline/timeline";
import Loading from "@/components/loading/Loading";

export default async function Home() {
  return(
    <Suspense fallback={<Loading />}>
      <HomeContent />
    </Suspense>
  )
  // const session = await getServerSession(options);
  
  // if(!session) {
  //   return(
  //     <div>サインインしてください</div>
  //   )
  // }
  // return (
  //   <main className="flex justify-center">
  //     <LeftBar userId={session?.user.id} />
  //     <div className="h-screen w-6/12 flex flex-col">
  //       <PostShare userId={session.user.id}/>
  //       <Suspense fallback={<Loading />}>
  //         <Timeline />
  //       </Suspense>
  //     </div>
  //     <RightBar />
  //   </main>
  // );
}

const HomeContent = async () => {
  const session = await getServerSession(options);
  
  if(!session) {
    return(
      <div>サインインしてください</div>
    )
  }
  return (
    <main className="flex justify-center">
      <LeftBar userId={session?.user.id} />
      <div className="h-screen w-6/12 flex flex-col">
        <PostShare userId={session.user.id}/>
        <Suspense fallback={<Loading />}>
          <Timeline />
        </Suspense>
      </div>
      <RightBar />
    </main>
  );
}

