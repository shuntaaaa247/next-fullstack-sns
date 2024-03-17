import { options } from "@/options";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import LeftBar from "@/components/leftBar/leftbar";
import RightBar from "@/components/rightBar/rightBar";
import SearchBar from "@/components/search/searchBar";
import SearchResult from "@/components/search/searchResult";
import Loading from "@/components/loading/Loading";

export default async function Search() {
  return(
    <div>
      <Suspense fallback={<Loading />}>
        <SearchContent />
      </Suspense>
    </div>
  )
}

const SearchContent = async () => {
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
        <SearchBar />
        <SearchResult />
      </div>
      <RightBar />
    </main>
  );
}

