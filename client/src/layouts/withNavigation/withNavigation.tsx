import React from "react";
import Navigation from "../../components/Navigation/Navigation";

const withNavigation = (Children: React.ComponentType) => (props: any) => {
  return (
    <div className="w-full h-full flex flex-col">
      <Navigation />
      <div className="mt-16 flex-grow">
        <Children {...props} />
      </div>
    </div>
  );
};

export default withNavigation;