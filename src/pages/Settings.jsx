import  { useState } from "react";
import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "../components";
import { MdOutlineSecurity } from "react-icons/md";
import { LogoutModal } from "../components/modals";

const Settings = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  return (
    <>
      <nav className="mt-4 border-b mb-8">
        <ul className="flex items-end gap-8">
          <li>
            <NavLink
              to="/settings"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 pb-4 transition-all ${
                  isActive && "border-b-4 border-b-primary"
                }`
              }
            >
              <span>Profile</span>
              <FaUser />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="security"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 pb-4 transition-all  ${
                  isActive && "border-b-4 border-b-primary"
                }`
              }
            >
              <span>Security</span>
              <MdOutlineSecurity />
            </NavLink>
          </li>
          <li className="ms-auto mb-4">
            <Button variant={"danger"} onClick={_=>setLogoutModal(true)}>
              <span>Logout</span>
              <FaSignOutAlt />
            </Button>
          </li>
        </ul>
      </nav>
      <Outlet />
      {/* Modal */}
      <LogoutModal isOpen={logoutModal} handleClose={_=>setLogoutModal(false)}/>
    </>
  );
};

export default Settings;
