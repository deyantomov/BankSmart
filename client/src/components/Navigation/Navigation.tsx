import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Navbar, Button, Input } from "react-daisyui";
import { FiAlignJustify } from "react-icons/fi";
import AuthButtons from "./AuthButtons";

export default function Navigation() {
  const { user } = useSelector((state: RootState) => state);
  
  return (
    <Navbar className="flex items-center justify-between p-2 gap-4 bg-primary w-full h-16 fixed top-0 left-0 right-0 z-10">
      <Button className="btn btn-ghost w-12 h-auto p-0">
        <FiAlignJustify size={24} color="white" />
      </Button>
      <Input className="w-1/4 h-10 rounded-sm px-2" />
      <AuthButtons token={user.token} firstName={user.firstName} />
    </Navbar>
  );
}
