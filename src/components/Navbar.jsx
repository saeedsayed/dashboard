// hooks
import { useState } from "react";
import { useContextProvider } from "../context/ContextProvider";
import { useAuth } from "../context/AuthContext";
// components
import { NavButton } from "./index";

// icons
import { FaRegSun, FaRegMoon } from "react-icons/fa";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { IoMdNotificationsOutline, IoIosArrowDown } from "react-icons/io";
import { MdOutlineChatBubbleOutline, MdFullscreen } from "react-icons/md";
import { PiSidebarFill } from "react-icons/pi";
import { LogoutModal, NavbarProfileModal } from "./modals";

const Navbar = () => {
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);
  const {
    darkThem,
    handleThem,
    handleSidebar,
    openSidebar,
    handleNavBox,
    openNavBox,
    isFullScreen,
    handleFullscreen,
  } = useContextProvider();
  const { adminUser } = useAuth();
  return (
    <>
      <div className="flex relative bg-main-bg z-10 pb-1 justify-between items-center text-primary">
        <NavButton
          content={<PiSidebarFill />}
          title={`${openSidebar ? "close" : "open"} sidebar`}
          onClick={handleSidebar}
          customStyle={`text-2xl`}
          active={openSidebar}
        />
        <div className="flex gap-2 sm:gap-4 text-xl">
          {/* <div className="absolute inset-0 -z-10 bg-main-bg" /> */}
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
            title={`${openNavBox.search ? "close" : "open"} search`}
            onClick={() => handleNavBox("search")}
            active={openNavBox.search}
          />
          <NavButton
            content={<MdFullscreen />}
            title={`${isFullScreen ? "close" : "show in"}  fullscreen`}
            onClick={handleFullscreen}
            active={isFullScreen}
          />
          <NavButton
            content={<IoCartOutline />}
            title={`${openNavBox.cart ? "close" : "open"}  cart`}
            onClick={() => handleNavBox("cart")}
          />
          <NavButton
            content={<MdOutlineChatBubbleOutline />}
            title={`${openNavBox.chat ? "close" : "open"}  chat`}
            onClick={() => handleNavBox("chat")}
            notification
          />
          <NavButton
            content={<IoMdNotificationsOutline />}
            title={`${
              openNavBox.notification ? "close" : "open"
            }  notification`}
            onClick={() => handleNavBox("notification")}
            notification
          />
          <NavButton
            content={darkThem ? <FaRegMoon /> : <FaRegSun />}
            title={`change to ${darkThem ? "light" : "dark"} them`}
            onClick={handleThem}
          />
          <div
            className="cursor-pointer relative flex items-center gap-2 select-none"
            onClick={() => handleNavBox("profile")}
          >
            <img
              draggable={false}
              src={adminUser?.photoURL}
              alt=""
              className="w-8 h-8 rounded-full"
            />
            <h6 className="text-xs flex items-center gap-1 text-primary-text ">
              Hi, {adminUser?.displayName.split(" ")[0]}
              <IoIosArrowDown
                className={`text-lg transition-all duration-300 ${
                  openNavBox.profile ? "rotate-180" : "rotate-0"
                }`}
              />
            </h6>
          </div>
        </div>
      </div>

      {/* modal */}
      <NavbarProfileModal
        handleLogoutModal={(_) => setIsOpenLogoutModal(true)}
      />
      <LogoutModal
        isOpen={isOpenLogoutModal}
        handleClose={(_) => {
          setIsOpenLogoutModal(false);
        }}
      />
    </>
  );
};

export default Navbar;
