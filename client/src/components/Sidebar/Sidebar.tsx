import { Drawer, Menu, Button } from "react-daisyui";
import { FiHome, FiBarChart2, FiDollarSign, FiTrendingUp } from "react-icons/fi";

export default function Sidebar({ isOpen, toggleSidebar }: { isOpen: boolean, toggleSidebar: () => void }) {
  console.log("Sidebar received isOpen:", isOpen);

  return (
    <Drawer
      open={isOpen}
      className="drawer"
      onClickOverlay={toggleSidebar}
      side={
        <Menu className="flex flex-col bg-white w-1/6 md:w-1/4 h-full p-4">
          <h1 className="text-3xl mt-16 mb-2">BankSmart</h1>
          <hr className="my-4 border border-primary" />
          <Menu.Item className="gap-2">
            <Button className="btn btn-ghost w-full flex justify-start items-center">
              <FiHome />
              <h1 className="text-xl">Home</h1>
            </Button>
          </Menu.Item>
          <Menu.Item className="gap-2">
            <Button className="btn btn-ghost w-full flex justify-start items-center">
              <FiBarChart2 />
              <h1 className="text-xl">Dashboard</h1>
            </Button>
          </Menu.Item>
          <Menu.Item className="gap-2">
            <Button className="btn btn-ghost w-full flex justify-start items-center">
              <FiDollarSign />
              <h1 className="text-xl">Accounts</h1>
            </Button>
          </Menu.Item>
          <Menu.Item className="gap-2">
            <Button className="btn btn-ghost w-full flex justify-start items-center">
              <FiTrendingUp />
              <h1 className="text-xl">Transactions</h1>
            </Button>
          </Menu.Item>
        </Menu>
      }
    />
  );
}