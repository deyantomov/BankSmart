import { Link } from "react-router-dom";
import { Navbar, Button, Input } from "react-daisyui";
import { FiAlignJustify } from "react-icons/fi";

export default function Navigation() {
  return (
    <Navbar className="flex items-center justify-between p-2 gap-4 bg-primary w-full h-16 fixed top-0 left-0 right-0 z-10">
      <Button className="btn btn-ghost w-12 h-auto p-0">
        <FiAlignJustify size={24} color="white" />
      </Button>
      <Input className="w-1/4 h-10 rounded-sm px-2" />
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
    </Navbar>
  );
}
