import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "./components";

const Layout = () => {
  return (
    <>
      <Sidebar />
      <div className="flex-1 p-4 w-96 flex flex-col">
        <Navbar />
        <div className="overflow-auto h-[calc(100vh-48px)] -me-4 pr-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
