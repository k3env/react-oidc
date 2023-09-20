import { useEffect, useState } from "react";
import logo from '../assets/react.svg'
import { useAuth } from "../providers/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { User } from "oidc-client-ts";

export function AppLayout() {
  const auth = useAuth()
  const nav = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    auth.service.getUser().then((res) => {
      setUser(res)
    })
  })

  const handleLogoutClick = () => {
    auth.service.logout().then(() => {
      nav('/')
    })
  }

  const handleLoginClick = () => {
    auth.service.login().then(() => {
      nav("/", { replace: true });
    });
  }
  return (
    <>
      <div id="header" className="flex flex-row gap-2 bg-slate-800 justify-between mb-6">
        <AppLogo />
        {user === null ? <LoginNavComponent onLoginClick={handleLoginClick} /> : <UserNavComponent onLogoutClick={handleLogoutClick} user={user} />}
      </div>
      <div className="mx-5">
        <Outlet />
      </div>
    </>
  )
}

export function AppLogo() {
  return (
    <div id="logo" className="bg-slate-800 p-2 flex flex-row gap-4 items-center">
      <div><img src={logo} width="100%" height="100%" /></div>
      <div><h2 className="font-play m-0 p-0 text-2xl">Application</h2></div>
    </div>
  )
}

export function UserNavComponent({ user, onLogoutClick }: { user: User, onLogoutClick: () => void }) {
  return (
    <div className="p-2 bg-slate-800 flex flex-row gap-4 justify-between font-nunito items-center">
      <div id="user" className="flex flex-col items-end">
        <div><span>{user.profile.given_name}</span></div>
        <div><span className="text-sm text-gray-400">{user.profile.family_name}</span></div>
      </div>
      <div className="flex-initial w-12 h-12 display-block rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${user.profile.picture ?? "https://avatars.s3.koven.tech/no-avatar.png"})` }} />
      <a className="px-2 display-block flex-initial text-white hover:text-emerald-500 transition-colors" onClick={onLogoutClick}><i className="fa-solid fa-right-from-bracket"></i></a>
    </div>
  )
}
export function LoginNavComponent({ onLoginClick }: { onLoginClick: () => void }) {
  return (
    <div className="p-2 bg-slate-800 flex flex-row gap-4 justify-between font-nunito items-center">
      <a className="px-2 display-block flex-initial text-white hover:text-emerald-500 cursor-default" onClick={onLoginClick}>Login <i className="fa-solid fa-right-to-bracket"></i></a>
    </div >
  )
}