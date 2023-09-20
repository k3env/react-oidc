import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export function LoginContainer() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    auth.service.login().then(() => {
      navigate(from, { replace: true });
    });
  }

  // auth.service.login().then(() => {
  //   navigate(from, { replace: true });
  // });

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}