import React, { useEffect, useState } from "react";
// hooks
import { useContextProvider } from "../context/ContextProvider";
// data
import { links } from "../data/dummy";
// icons
import { FaArrowLeft } from "react-icons/fa";
// components
import { NavLink } from "react-router-dom";
import { SideModal } from "./modals";

const Sidebar = () => {
  const { openSidebar, handleSidebar } = useContextProvider();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect((_) => {
    const handleResize = (_) => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 640) {
          setIsSmallScreen(true);
        } else {
          setIsSmallScreen(false);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return (_) => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className={`hidden sm:block bg-section-bg overflow-auto pt-6 px-2`}>
        {links.map((group, i) => (
          <div key={i}>
            <h3
              className={`${
                openSidebar ? "w-24" : "w-3 translate-x-3"
              } transition-all duration-500 font-bold text-primary-text overflow-hidden truncate`}
            >
              {group.title}
            </h3>
            <div className="flex flex-col">
              {group.links.map((link, i) => (
                <NavLink
                  key={i}
                  to={link.name}
                  title={link.name}
                  className="flex hover:bg-hover items-center py-1 px-2 text-primary rounded-lg truncate"
                >
                  {link.icon}
                  <span
                    className={`overflow-hidden transition-all duration-500  ${
                      openSidebar ? "ms-3 w-32" : " w-0"
                    }`}
                  >
                    {link.name}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* **********
       * small devices Sidebar *
       ************** */}
      <SideModal
        isOpen={openSidebar && isSmallScreen}
        handleClose={handleSidebar}
        dir={"left"}
      >
        <div
          // className={`block sm:hidden min-w-52 h-screen bg-section-bg overflow-auto pt-3 px-3`}
          className="bg-section-bg h-screen pt-6 px-4 min-w-52"
        >
          <button
            className="float-right text-primary text-xl"
            onClick={(_) => handleSidebar()}
          >
            <FaArrowLeft />
          </button>
          {links.map((group, i) => (
            <div key={i}>
              {
                <h3
                  className={`transition-all duration-500 font-bold text-primary-text overflow-hidden`}
                >
                  {group.title}
                </h3>
              }
              <div className="flex flex-col">
                {group.links.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.name}
                    title={link.name}
                    onClick={(_) => handleSidebar()}
                    className="flex hover:bg-hover items-center py-1 px-2 text-primary rounded-lg truncate"
                  >
                    {link.icon}
                    <span
                      className={`overflow-hidden transition-all duration-500`}
                    >
                      {link.name}
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SideModal>
    </>
  );
};

export default Sidebar;
