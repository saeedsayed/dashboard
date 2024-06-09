import Modal from "react-modal";
import { IoIosLogOut } from "react-icons/io";
import { IoPerson, IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContextProvider } from "../../context/ContextProvider";

const NavbarProfileModal = ({ handleLogoutModal }) => {
  const { openNavBox, handleNavBox } = useContextProvider();
  const handleClose = () => {
    handleNavBox((p) => ({ ...p, profile: false }));
  };
  return (
    <Modal
      isOpen={openNavBox.profile}
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
      className={
        "absolute w-60 px-5 py-3 bg-section-bg rounded-lg shadow border"
      }
    >
      <ul className="space-y-3 dark:text-white" onClick={handleClose}>
        <li className="font-medium">
          <Link
            to={"/user-profile"}
            className="flex w-full items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-secondary"
          >
            <IoPerson className="w-6 h-6 mr-3" />
            Account
          </Link>
        </li>
        <li className="font-medium ">
          <Link
            to={"/settings"}
            className="flex w-full items-center transform transition-colors duration-200 border-r-4 border-transparent
            hover:border-secondary"
          >
            <IoSettingsSharp className="w-6 h-6 mr-3" />
            Setting
          </Link>
        </li>
        <hr className="dark:border-gray-700" />
        <li className="font-medium">
          <button
            onClick={handleLogoutModal}
            className="flex w-full items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
          >
            <IoIosLogOut className="mr-3 text-red-600 w-6 h-6" />
            Logout
          </button>
        </li>
      </ul>
    </Modal>
  );
};

export default NavbarProfileModal;
