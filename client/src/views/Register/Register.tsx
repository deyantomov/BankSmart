import { ChangeEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Input, Button } from "react-daisyui";
import { register } from "../../routes/auth";

export default function Register() {
  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleUpdateForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: field, value } = e.target;

    setRegisterFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitForm = async () => {
    const { email, firstName, lastName, password, confirmPassword } = registerFormData;

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }

      const response = await register(email, firstName, lastName, password);

      console.log(response);
      alert(response.message);
      navigate("/login", { state: {email} });
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex w-full h-full justify-center items-center px-4 sm:px-0">
      <Card className="flex w-full sm:w-5/6 md:w-4/6 h-5/6 sm:h-4/6 rounded-md shadow-xl border justify-center p-2 px-12 sm:px-2">
        <div className="flex flex-col gap-4 w-full sm:w-5/6 h-full justify-center items-center text-start">
          <h1 className="text-center text-5xl mb-8 w-full">Register</h1>
          <div className="flex flex-col sm:flex-row w-full gap-4">
            <Input
              type="text"
              className="border rounded-md shadow-md input-md text-xl w-full"
              placeholder="E-mail"
              name="email"
              onChange={handleUpdateForm}
            />
            <Input
              type="text"
              className="border rounded-md shadow-md input-md text-xl w-full"
              placeholder="First name"
              name="firstName"
              onChange={handleUpdateForm}
            />
            <Input
              type="text"
              className="border rounded-md shadow-md input-md text-xl w-full"
              placeholder="Last name"
              name="lastName"
              onChange={handleUpdateForm}
            />
          </div>
          <div className="flex flex-col sm:flex-row w-full gap-4">
            <Input
              type="password"
              className="border rounded-md shadow-md input-md text-xl w-full"
              placeholder="Password"
              name="password"
              onChange={handleUpdateForm}
            />
            <Input
              type="password"
              className="border rounded-md shadow-md input-md text-xl w-full"
              placeholder="Confirm password"
              name="confirmPassword"
              onChange={handleUpdateForm}
            />
          </div>
          <div className="flex w-full justify-start mt-4">
            <Link to={"/login"} className="text-primary">
              <p>Already registered? Sign in here.</p>
            </Link>
          </div>
          <Button
            className="btn btn-primary text-xl text-white w-full"
            onClick={handleSubmitForm}
          >
            Register
          </Button>
        </div>
      </Card>
    </div>
  );
}
