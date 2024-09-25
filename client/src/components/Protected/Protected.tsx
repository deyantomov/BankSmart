import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect } from "react";

export default function Protected({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return <>{children}</>;
}
