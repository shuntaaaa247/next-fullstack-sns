import { options } from "@/options";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import PostShare from "../components/timeline/postShare";
import LeftBar from "@/components/leftBar/leftbar";
import RightBar from "@/components/rightBar/rightBar";
import Timeline from "@/components/timeline/timeline";
import Loading from "@/components/loading/Loading";
// import UnderBar from "@/components/underBar/underbar";

export default async function Home() {
  return(
    <Suspense fallback={<Loading />}>
      <HomeContent />
    </Suspense>
  )
}

const HomeContent = async () => {
  const session = await getServerSession(options);
  
  if(!session) {
    return(
      <div>サインインしてください</div>
    )
  }
  return (
    <main className="sm:flex md:justify-center">
      <LeftBar userId={session?.user.id} />
      <div className="h-screen w-full sm:w-3/4 md:w-6/12 mt-[60px] sm:mt-0 flex flex-col sm:ml-auto md:mx-auto">
        <PostShare userId={session.user.id}/>
        <Suspense fallback={<Loading />}>
          <Timeline />
        </Suspense>
      </div>
      <RightBar />
      {/* <UnderBar /> */}
    </main>
  );
}

