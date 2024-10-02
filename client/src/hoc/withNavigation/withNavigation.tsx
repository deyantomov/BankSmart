import React, { useState } from "react";
import { Drawer, Menu, Button } from "react-daisyui";
import Navigation from "../../components/Navigation/Navigation";
import { FiHome, FiBarChart2, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import "./withNavigation.css"; // Import the CSS file

const withNavigation = (Children: React.ComponentType) => (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Drawer
        open={isOpen}
        className="drawer"
        onClickOverlay={toggleSidebar}
        side={
          <Menu className="flex flex-col bg-white w-1/6 md:w-1/4 h-full p-4">
            <h1 className="text-3xl mt-16 mb-2">BankSmart</h1>
            <hr className="my-4 border border-primary"/>
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
      <div className="flex-grow flex flex-col w-full h-full">
        <Navigation toggleDrawer={toggleSidebar} />
        <div className="flex-grow flex flex-col justify-center items-center mt-16">
          <Children {...props} />
        </div>
      </div>
    </div>
  );
};

export default withNavigation;