
import { SigninButton, SignoutButton } from "../../components/signIn-signOut/buttons";


async function Sign() {
  
  return (
    <main>
      <div className="flex justify-center items-center h-screen w-full">
        <SigninButton/>
        {/* <SignoutButton/> */}
      </div>
    </main>
  )
}

export default Sign;