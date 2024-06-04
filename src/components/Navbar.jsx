import React from "react";
// hooks
import { useContextProvider } from "../context/ContextProvider";
// components
import { NavButton } from "./index";
import { IoIosLogOut } from "react-icons/io";
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
import { useAuth } from "../context/AuthContext";
import Modal from "react-modal";
import { IoPerson } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";


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
  const { adminUser, handleLogout } = useAuth();
  return (
    <>
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
            className="cursor-pointer relative flex items-center gap-2 select-none"
            onClick={() => handelNavBox("profile")}
          >
            <img
              draggable={false}
              src={adminUser?.photoURL || avatar}
              alt=""
              className="w-8 h-8 rounded-full"
            />
            <h6 className="text-xs flex items-center gap-1 text-primary-text ">
              Hi, {adminUser?.displayName}
              {openNavBox.profile ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </h6>
          </div>
        </div>
      </div>

      {/* modal */}
      <ProfileModal
        isOpen={openNavBox.profile}
        handleClose={(_) => {
          handelNavBox("profile");
        }}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;

const ProfileModal = ({ isOpen, handleClose, handleLogout }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={handleClose}
    style={{
      content: {
        top: "55px",
        right: "20px",
      },
      overlay: {
        backgroundColor: "transparent",
        zIndex: 1000,
      },
    }}
    className={"absolute w-60 px-5 py-3 bg-section-bg rounded-lg shadow border"}
  >
    <ul className="space-y-3 dark:text-white" onClick={handleClose}>
      <li className="font-medium">
        <button className="flex w-full items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700">
          <IoPerson className="w-6 h-6 mr-3" />
          Account
        </button>
      </li>
      <li className="font-medium">
        <button className="flex w-full items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700">
          <IoSettingsSharp className="w-6 h-6 mr-3" />
          Setting
        </button>
      </li>
      <hr className="dark:border-gray-700" />
      <li className="font-medium">
        <button
          onClick={handleLogout}
          className="flex w-full items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
        >
          <IoIosLogOut className="mr-3 text-red-600 w-6 h-6" />
          Logout
        </button>
      </li>
    </ul>
  </Modal>
);
