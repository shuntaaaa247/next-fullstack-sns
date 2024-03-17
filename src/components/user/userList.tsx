import UserOnList from "./userOnList";

type UserListProps = {
  mode: string,
  following: any | null,
  followers: any | null,
}

const UserList = ({ mode, following, followers }: UserListProps) => {
  console.log("following:", following);

  const fetchedUser: any[] = []

  return(
    <div>
      { mode === "following" 
      ?
      <div>
      { following.map((user: any) => {
        return(
          <div key={user.id}>
            <UserOnList user={user} />
          </div>
        )
      })}
      </div>
      :
      <div>
      { followers.map((user: any) => {
        return(
          <div key={user.id}>
            <UserOnList user={user} />
          </div>
        )
      })}
      </div>
    }
    </div>
  )
}

export default UserList