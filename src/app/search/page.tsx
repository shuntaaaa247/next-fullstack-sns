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
    <main className="sm:flex md:justify-center">
      <LeftBar userId={session?.user.id} />
      <div className="h-screen w-full mt-[60px] sm:mt-0 sm:w-3/4 md:w-6/12 flex flex-col sm:ml-auto md:mx-auto">
        <SearchBar />
        <SearchResult />
      </div>
      <RightBar />
    </main>
  );
}

