import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { User } from "oidc-client-ts";

function App() {
  const auth = useAuth()
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    auth.service.getUser().then((v) => {
      if (v !== null) {
        setUser(v)
      }
    })
  }, [])
  if (user === null) {
    return <div className="bg-slate-500">Hello, stranger</div>
  }
  return (
    <div className='bg-slate-500'>
      Hello, {JSON.stringify(user.profile, undefined, 2)}
    </div>
  )
}

export default App
