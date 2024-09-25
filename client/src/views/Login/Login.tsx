import { useState, useEffect, ChangeEvent } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveToken } from "../../features/user/userSlice";
import { Card, Input, Button } from "react-daisyui";
import { login } from "../../routes/auth";

export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  
  const { state: locationState } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (locationState && locationState.email) {
      setLoginFormData((prev) => ({
        ...prev,
        email: locationState.email
      }));
    }
  }, [locationState]);

  const handleUpdateForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: field, value } = e.target;

    setLoginFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitForm = async () => {
    try {
      const { token } = await login(
        loginFormData.email,
        loginFormData.password
      );
      dispatch(saveToken(token));
    } catch (err: any) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <div className="flex w-full h-full justify-center items-center px-4 sm:px-0">
      <Card className="flex w-full sm:w-5/6 md:w-4/6 h-4/6 rounded-md shadow-xl border justify-center p-2 px-12 sm:px-2">
        <div className="flex flex-col gap-4 w-full sm:w-1/2 h-full justify-center items-center text-start">
          <h1 className="text-center text-5xl mb-8 w-full">Login</h1>
          <Input
            type="text"
            className="border rounded-md shadow-md input-md text-xl w-full"
            placeholder="E-mail"
            name="email"
            value={loginFormData.email}
            onChange={handleUpdateForm}
          />
          <Input
            type="password"
            className="border rounded-md shadow-md input-md text-xl w-full"
            placeholder="Password"
            name="password"
            value={loginFormData.password}
            onChange={handleUpdateForm}
          />
          <div className="flex w-full justify-start mt-4">
            <Link to={"/register"} className="text-primary">
              <p>Don't have an account yet? Sign up here.</p>
            </Link>
          </div>
          <Button
            className="btn btn-primary text-xl text-white w-full"
            onClick={handleSubmitForm}
          >
            Log in
          </Button>
        </div>
      </Card>
    </div>
  );
}
