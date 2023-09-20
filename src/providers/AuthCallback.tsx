import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function AuthCallback() {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    auth.service.loginCallback().then(() => {
      navigate("/");
    });
  }, []);

  return <div>Processing signin...</div>;
}