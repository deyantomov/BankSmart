import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navigation from "../../components/Navigation/Navigation";
import "./withNavigation.css"; // Import the CSS file

const withNavigation = (Children: React.ComponentType) => (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="drawer-content flex-grow flex flex-col w-full h-full">
        <Navigation toggleDrawer={toggleSidebar} />
        <div className="flex-grow flex flex-col justify-center items-center mt-16">
          <Children {...props} />
        </div>
      </div>
    </div>
  );
};

export default withNavigation;