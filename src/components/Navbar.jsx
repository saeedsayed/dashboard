import React from "react";
// hooks
import { useContextProvider } from "../context/ContextProvider";
// components
import { NavButton } from "./index";
// assets
import avatar from "../assets/images/avatar.jpg";
// icons
import { FaRegSun, FaRegMoon } from "react-icons/fa";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import {
  IoMdNotificationsOutline,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import { MdOutlineChatBubbleOutline, MdFullscreen } from "react-icons/md";
import { PiSidebarFill } from "react-icons/pi";

const Navbar = () => {
  const {
    darkThem,
    handelThem,
    handelSidebar,
    openSidebar,
    handelNavBox,
    openNavBox,
    isFullScreen,
    handleFullscreen,
  } = useContextProvider();
  return (
    <div className="flex relative bg-main-bg z-10 pb-1 justify-between items-center text-primary">
      <NavButton
        content={<PiSidebarFill />}
        tooltip={`${openSidebar ? "close" : "open"} sidebar`}
        handelClick={handelSidebar}
        customStyle={`text-2xl`}
        active={openSidebar}
      />
      <div className="flex gap-2 sm:gap-4 text-xl">
        <div className="absolute inset-0 -z-10 bg-main-bg" />
        <input
          type="text"
          placeholder="search about something"
          className={`bg-section-bg absolute md:text-sm text-lg -z-20 md:z-0 left-0 md:relative w-full md:w-auto text-primary-text px-2
            focus:outline-none origin-right duration-500 ${
              openNavBox.search
                ? "md:scale-x-100 md:bottom-0 -bottom-7"
                : "md:scale-x-0 opacity-0 bottom-0"
            }`}
        />
        <NavButton
          content={<IoSearchOutline />}
          tooltip={`${openNavBox.search ? "close" : "open"} search`}
          handelClick={() => handelNavBox("search")}
          active={openNavBox.search}
        />
        <NavButton
          content={<MdFullscreen />}
          tooltip={`${isFullScreen ? "close" : "show in"}  fullscreen`}
          handelClick={handleFullscreen}
          active={isFullScreen}
        />
        <NavButton
          content={<IoCartOutline />}
          tooltip={`${openNavBox.cart ? "close" : "open"}  cart`}
          handelClick={() => handelNavBox("cart")}
        />
        <NavButton
          content={<MdOutlineChatBubbleOutline />}
          tooltip={`${openNavBox.chat ? "close" : "open"}  chat`}
          handelClick={() => handelNavBox("chat")}
          notification
        />
        <NavButton
          content={<IoMdNotificationsOutline />}
          tooltip={`${
            openNavBox.notification ? "close" : "open"
          }  notification`}
          handelClick={() => handelNavBox("notification")}
          notification
        />
        <NavButton
          content={darkThem ? <FaRegMoon /> : <FaRegSun />}
          tooltip={`change to ${darkThem ? "light" : "dark"} them`}
          handelClick={handelThem}
        />
        <div
          className="cursor-pointer flex items-center gap-2 select-none"
          onClick={() => handelNavBox("profile")}
        >
          <img
            draggable={false}
            src={avatar}
            alt=""
            className="w-8 h-8 rounded-full"
          />
          <h6 className="text-xs flex items-center gap-1 text-primary-text ">
            Hi, admin{" "}
            {openNavBox.profile ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
