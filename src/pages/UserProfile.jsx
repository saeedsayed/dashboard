import { useEffect, useState } from "react";
import { CardBody, FullScreenLoading } from "../components";
import {
  IoIosClose,
  IoLogoFacebook,
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
} from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { onSnapshot, updateDoc } from "firebase/firestore";
import { useUsersDocRef } from "../firebase";

import { MdEdit } from "react-icons/md";
import { FaExclamation } from "react-icons/fa";
import { MdMedicalInformation } from "react-icons/md";
import { ChangeUserAvatarModal } from "../components/modals";
import Button from "../components/Button";
import { FaCheck } from "react-icons/fa";
import { useContextProvider } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import { TbWorldWww } from "react-icons/tb";

const UserProfile = () => {
  const { adminUser } = useAuth();
  const { setSnackbar } = useContextProvider();
  const [changeAvatarModal, setChangeAvatarModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [updateAboutMe, setUpdateAboutMe] = useState(false);
  const [newAboutMe, setNewAboutMe] = useState("");

  const handleUpdateAboutMe = async () => {
    if (newAboutMe == userData.aboutMe) {
      setSnackbar({
        isOpen: true,
        type: "error",
        message: "Nothing to update",
      });
      return;
    }
    try {
      setLoading(true);
      await updateDoc(useUsersDocRef(adminUser.email), {
        aboutMe: newAboutMe,
      });
      setSnackbar({
        isOpen: true,
        type: "success",
        message: "About me updated successfully",
      });
    } catch (err) {
      setSnackbar({
        isOpen: true,
        type: "error",
        message: "something went wrong please try again",
      });
    } finally {
      setUpdateAboutMe(false);
      setLoading(false);
    }
  };

  const getUserData = async (_) => {
    onSnapshot(useUsersDocRef(adminUser.email), (res) => {
      setUserData(res.data());
      setLoading(false);
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return <FullScreenLoading />;
  }

  return (
    <>
      <div className="flex gap-4 flex-wrap items-start mt-8">
        {/* left col  */}
        <div className="text-center flex-1 min-w-80 md:flex-none  flex flex-col gap-4">
          {/* left col (row one) */}
          <CardBody>
            <div className="relative max-w-80 mx-auto rounded-full bg-main-bg overflow-hidden">
              <img
                src={userData.avatar}
                className="md:w-80 aspect-square rounded-full"
                alt=""
              />
              <button
                className="absolute -bottom-px p-5 w-full bg-black hover:opacity-100 
              transition-all opacity-60 left-0 text-white"
                onClick={(_) => setChangeAvatarModal(true)}
              >
                change your photo
              </button>
            </div>
            <p className="mt-6 text-4xl text-primary font-bold">
              {userData.firstName}
            </p>
            <p className="text-xl">{userData.role}</p>
            <p className="text-xl">{userData.email}</p>
          </CardBody>
          {/* left col (row two) */}
          <CardBody>
            <ul>
              {userData.socialLinks.map(
                ({ socialName, userName, baseUrl }, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border-b mb-2 pb-2 [&:last-child]:mb-0 [&:last-child]:pb-0 [&:last-child]:border-0"
                  >
                    <div className="flex items-center gap-2 text-2xl ">
                      {socialName == "Website" && (
                        <TbWorldWww className="text-gray-600 text-3xl" />
                      )}
                      {socialName == "Facebook" && (
                        <IoLogoFacebook className="text-blue-600 text-3xl" />
                      )}
                      {socialName == "XTwitter" && (
                        <IoLogoTwitter className="text-blue-400 text-3xl" />
                      )}
                      {socialName == "Instagram" && (
                        <IoLogoInstagram className="text-red-600 text-3xl" />
                      )}
                      {socialName == "Linkedin" && (
                        <IoLogoLinkedin className="text-blue-500 text-3xl" />
                      )}
                      {socialName == "Github" && (
                        <IoLogoGithub className="text-gray-600 text-3xl" />
                      )}
                      <p className="md:text-xl text-lg">{socialName}</p>
                    </div>
                    {!!userName ? (
                      <a
                        href={`${baseUrl}${userName}`}
                        target="_blank"
                        className={`truncate md:max-w-52 ${
                          !userName && "text-gray-500"
                        }`}
                      >
                        {socialName !== "Website" && "/"}
                        {userName}
                      </a>
                    ) : (
                      <span className="opacity-70 text-lg flex items-center gap-2 text-red-700">
                        Not added <FaExclamation />
                      </span>
                    )}
                  </li>
                )
              )}
            </ul>
          </CardBody>
        </div>
        {/* right col */}
        <div className="flex-1 min-w-80">
          <CardBody>
            <h3 className="bg-main-bg px-4 py-2 md:text-3xl text-xl mb-2 font-bold">
              Base information
            </h3>
            <ul className="ps-6">
              <PersonalInfoItem
                infoName={"Full name"}
                info={userData.firstName + " " + userData.lastName}
              />
              <PersonalInfoItem infoName={"Email"} info={userData.email} />
              <PersonalInfoItem
                infoName={"Phone Number"}
                info={userData.phoneNumber}
              />
              <PersonalInfoItem infoName={"Address"} info={userData.address} />
              <PersonalInfoItem
                infoName={"Birthday"}
                info={userData.birthday}
              />
              <PersonalInfoItem infoName={"Role"} info={userData.role} />
            </ul>
            <div className="border rounded-md overflow-hidden border-border">
              <div className="flex items-center px-4 py-2 justify-between bg-main-bg">
                <p className="md:text-2xl text-lg font-bold flex items-center gap-2">
                  About Me <MdMedicalInformation />
                </p>
                {updateAboutMe ? (
                  <div className="flex gap-4">
                    <Button
                      variant={"success"}
                      circle
                      className={"w-10"}
                      onClick={handleUpdateAboutMe}
                    >
                      <FaCheck />
                    </Button>
                    <Button
                      variant={"danger"}
                      circle
                      className={"w-10 text-2xl"}
                      onClick={(_) => setUpdateAboutMe(false)}
                    >
                      <IoIosClose />
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-10 text-2xl"
                    variant="primary"
                    circle
                    title="edit about me"
                    onClick={(_) => {
                      setUpdateAboutMe(true);
                      setNewAboutMe(userData.aboutMe);
                    }}
                  >
                    <MdEdit />
                  </Button>
                )}
              </div>
              {updateAboutMe ? (
                <div className="flex p-1">
                  <textarea
                    autoFocus
                    className="w-full min-h-11 max-h-72 bg-transparent px-4 py-2 border border-border rounded-md"
                    placeholder="Add something about yourself"
                    value={newAboutMe}
                    onChange={(e) => setNewAboutMe(e.target.value)}
                  />
                </div>
              ) : (
                <p className="px-6 py-3 text-ellipsis">
                  {userData.aboutMe || "Add something about yourself"}
                </p>
              )}
            </div>
            <Link to={"/settings"} className="inline-block">
              <Button variant={"warning"} className={"mt-4 mx-auto md:mx-0"}>
                Edit your personal information <MdEdit className=" text-xl" />
              </Button>
            </Link>
          </CardBody>
        </div>
      </div>
      {/* Modal */}
      <ChangeUserAvatarModal
        isOpen={changeAvatarModal}
        handleClose={(_) => setChangeAvatarModal(false)}
        isUploadingAvatar={setLoading}
      />
    </>
  );
};

export default UserProfile;

const PersonalInfoItem = ({ infoName, info }) => (
  <li className="md:text-lg text-primary-text text-sm mb-4 border-b pb-4">
    <span className="md:text-xl  me-4 font-bold text-secondary">
      {infoName} :
    </span>{" "}
    {info || (
      <span className="text-red-600 opacity-70 inline-flex items-center gap-2">
        Not added <FaExclamation />
      </span>
    )}
  </li>
);
