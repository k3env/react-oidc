import { useEffect, useState } from "react"
import { User } from "oidc-client-ts"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export function Dashboard() {
  const auth = useAuth()
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    auth.service.getUser().then((u) => setUser(u))
  }, [])

  const handleLogout = () => {
    auth.service.logout().then(() => {
      navigate('/')
    })
  }

  if (user === null) {
    return <div className="bg-red-500">Loading user...</div>
  }

  return (
    <>
      <pre className="bg-violet-500 text-white text-wrap p-2">{JSON.stringify(user.profile, undefined, 2)}</pre>
      <button onClick={handleLogout}>Logout</button>
      <pre>ChA2NzRkNjcxY2IwY2JkNTVmEgltaWNyb3NvZnQ - Live</pre>
      <pre>Cgg5NTc2NjgzORIGZ2l0aHVi - GitHub</pre>
    </>
  )
}