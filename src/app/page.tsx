import { options } from "@/options";
import { getServerSession } from "next-auth";
import PostShare from "../components/timeline/postShare";
import type { PostType } from "@/types";
import LeftBar from "@/components/leftBar/leftbar";
import RightBar from "@/components/rightBar/rightBar";
import Timeline from "@/components/timeline/timeline";
import { Suspense } from "react";
import Loading from "@/components/loading/Loading";

export default async function Home() {
  return (
    <main className="flex justify-center">
      <LeftBar />
      <div className="h-screen w-6/12 flex flex-col">
        <PostShare />
        <Suspense fallback={<Loading />}>
          <Timeline />
        </Suspense>
      </div>
      <RightBar />
    </main>
  );
}

