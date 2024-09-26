import { Link } from "react-router-dom";
import { Button } from "react-daisyui";
import useLogout from "../../hooks/useLogout";

interface AuthButtonProps {
  token: string;
  firstName: string;
}

export default function AuthButtons({ token, firstName }: AuthButtonProps) {
  const logout = useLogout();
  
  return token ? (
    <div className="flex items-center w-1/8 h-full gap-4">
      <h1 className="text-white text-md">Welcome, {firstName}</h1>
      <Button
        className="btn btn-ghost border-white text-white rounded-md"
        onClick={logout}
      >
        Log out
      </Button>
    </div>
  ) : (
    <div className="flex w-1/8 h-full gap-2">
      <Link to="/login">
        <Button className="btn btn-ghost border-white text-white rounded-md">
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button className="btn btn-white rounded-md">Register</Button>
      </Link>
    </div>
  );
}
