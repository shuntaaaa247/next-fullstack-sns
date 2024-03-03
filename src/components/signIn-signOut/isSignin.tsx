"use client"
import { useSession } from "next-auth/react"

const IsSignin = () => {
  const { data: session, status } = useSession();
  return(
    <div>
      {(status === "authenticated") ?
        <div>
          <div>ログインしてる{session.user?.email ?? "わっしょい"}</div>
          <div>id:{session.user?.id ?? "わっしょい"}</div>
          <button onClick={() => console.log(session)}>sessionを確認する</button>
        </div>
        :
          <div>ログインしてない</div>
      }
    </div>
  )
}

export default IsSignin;