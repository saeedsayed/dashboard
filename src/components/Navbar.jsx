import React from "react";
// hooks
import { useContextProvider } from "../context/ContextProvider";
// components
import { NavButton } from "./index";
import avatar from "../assets/images/avatar.jpg";
// icons
import { FaRegSun, FaRegMoon } from "react-icons/fa";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import {
  IoMdNotificationsOutline,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { PiSidebarFill } from "react-icons/pi";

const Navbar = () => {
  const {
    darkThem,
    handelThem,
    handelSidebar,
    openSidebar,
    handelNavBox,
    openNavBox,
  } = useContextProvider();
  return (
    <div className="flex justify-between items-center text-primary">
      <NavButton
        content={<PiSidebarFill />}
        tooltip={`${openSidebar ? "close" : "open"} sidebar`}
        handelClick={handelSidebar}
        customStyle={`${openSidebar && "text-secondary bg-hover"} text-2xl`}
      />
      <div className="flex gap-2 sm:gap-4 text-xl">
        <NavButton
          content={<IoSearchOutline />}
          tooltip={`${openNavBox.search ? "close" : "open"}  search`}
          handelClick={() => handelNavBox("search")}
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
          className="cursor-pointer flex items-center gap-2"
          onClick={() => handelNavBox("profile")}
        >
          <img src={avatar} alt="" className="w-8 h-8 rounded-full" />
          <h6 className="text-xs flex items-center gap-1 text-primary-text">
            Hi, admin{" "}
            {openNavBox.profile ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
