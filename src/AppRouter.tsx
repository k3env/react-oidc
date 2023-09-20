import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import { Dashboard } from "./pages/Dashboard";
import { AuthCallback } from "./providers/AuthCallback";
import { AppLayout } from "./layouts/AppLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { LoginContainer } from "./pages/LoginContainer";
import { AuthorizedLayout } from "./layouts/AuthorizedLayout";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} >
          <Route path="/openid/callback" element={<AuthCallback />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<App />} />
          <Route element={<AuthorizedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}