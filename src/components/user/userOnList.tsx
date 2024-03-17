"use client"
import { useRouter } from "next/navigation"

type UserOnListProps = {
  user: any
}

const UserOnList = ({ user }: UserOnListProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/profile/${user.id}`)
  }
  return(
    <div onClick={() => handleClick()} className="border-b hover:bg-blue-50 cursor-pointer">
      <div className="mx-4 py-1">
        <p className="text-xl font-semibold">{ user.username }</p>
        <p>{ user.introduction }</p>
        <p>{ user.password }</p>
      </div>
    </div>
  )
}

export default UserOnList