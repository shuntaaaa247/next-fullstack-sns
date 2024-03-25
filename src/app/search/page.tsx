import { options } from "@/options";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import LeftBar from "@/components/leftBar/leftbar";
import RightBar from "@/components/rightBar/rightBar";
import SearchBar from "@/components/search/searchBar";
import SearchResult from "@/components/search/searchResult";
import Loading from "@/components/loading/Loading";
import { getRandomUsers } from "@/functions/getRandomUsers";
import OtherUsers from "../../components/rightBar/otherUsers";

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
  const randomUsers = await getRandomUsers(3);
  
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
        <div className="m-2 mt-5 rounded-xl bg-slate-50">
        <p className="text-2xl font-medium text-center pt-3">Let&apos;s Find Users</p>
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
      </div>
      <RightBar />
    </main>
  );
}

