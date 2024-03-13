import { options } from "@/options";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import LeftBar from "@/components/leftBar/leftbar";
import RightBar from "@/components/rightBar/rightBar";

export default async function Search() {
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
        this is search page
      </div>
      <RightBar />
    </main>
  );
}

