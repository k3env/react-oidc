import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { User } from "oidc-client-ts";

export function AuthorizedLayout() {
  const auth = useAuth();
  const nav = useNavigate();
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    auth.service.getUser().then((res) => {
      if (res === null) {
        auth.service.login().then(() => {
          nav("/", { replace: true });
        });
      } else {
        setUser(res)
      }
    })
  })

  if (user === null) {
    return <>User not loaded</>
  }
  return (
    <Outlet />
  )
}
