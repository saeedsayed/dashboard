import React from "react";
// hooks
import { useContextProvider } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";
// data
import { links } from "../data/dummy";
// icons
import { FaArrowLeft } from "react-icons/fa";

const Sidebar = () => {
  const { openSidebar, handelSidebar } = useContextProvider();
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
                      openSidebar ? "ms-3 w-56" : " w-0"
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
      <div
        className={`${
          openSidebar ? "left-0" : "-left-full"
        } z-50 transition-all block sm:hidden min-w-52 fixed h-screen bg-section-bg overflow-auto pt-3 px-3`}
      >
        <button
          className="float-right text-primary text-xl"
          onClick={(_) => handelSidebar()}
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
                  onClick={(_) => handelSidebar()}
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
    </>
  );
};

export default Sidebar;
