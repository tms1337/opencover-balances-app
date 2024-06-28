import React from "react";

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className="p-12 ">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        OpenCover <span className="text-gray-600">Balances</span>
      </h1>

      {children}
    </div>
  );
};

export default MainLayout;
