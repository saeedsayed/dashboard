import { useAuth } from "../../context/AuthContext";
import Button from "../Button";
import CenterModal from "./CenterModal";
import { LuLogOut } from "react-icons/lu";
import { FaRegDotCircle } from "react-icons/fa";

const LogoutModal = ({ isOpen, handleClose }) => {
    const {handleLogout} = useAuth()
    return(
  <CenterModal isOpen={isOpen} handleClose={handleClose}>
    <div>
      <h3 className="text-center font-bold text-3xl mb-4 text-primary-text">
        Are you sure you want to Logout?
      </h3>
      <div className="flex justify-evenly items-center">
        <Button
          variant={"danger"}
          onClick={handleLogout}
        >
          YES <LuLogOut />
        </Button>
        <Button
        variant={"secondary"}
        className={"px-8"}
          onClick={handleClose}
        >
          Stay <FaRegDotCircle />
        </Button>
      </div>
    </div>
  </CenterModal>
);}
export default LogoutModal;
