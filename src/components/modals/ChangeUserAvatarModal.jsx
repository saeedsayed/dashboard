import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { updateDoc } from "firebase/firestore";
import { storage, useUsersDocRef } from "../../firebase";
import CenterModal from "./CenterModal";
import { IoClose } from "react-icons/io5";
import { FileUploader } from "react-drag-drop-files";
import { CgArrowsExchange } from "react-icons/cg";
import Button from "../Button";
import { useContextProvider } from "../../context/ContextProvider";

const ChangeUserAvatarModal = ({ isOpen, handleClose, isUploadingAvatar }) => {
  const [newAvatar, setNewAvatar] = useState(null);
  const { adminUser } = useAuth();
  const { setSnackbar } = useContextProvider();

  const handleUpdateAvatar = async (_) => {
    isUploadingAvatar(true);
    try {
      const storageRef = ref(storage, `userAvatars/${adminUser.email} avatar`);
      await uploadBytesResumable(storageRef, newAvatar);
      const url = await getDownloadURL(storageRef);
      await updateProfile(adminUser, {
        photoURL: url,
      });
      await updateDoc(useUsersDocRef(adminUser.email), {
        avatar: url,
      });
      setSnackbar({
        isOpen: true,
        message: "Avatar changed successfully",
        type: "success",
      });
    } catch {
      setSnackbar({
        isOpen: true,
        message: "the email is existing",
        type: "",
      });
    } finally {
      handleClose();
      isUploadingAvatar(false);
    }
  };

  useEffect(() => {
    setNewAvatar(null);
  }, [isOpen]);
  return (
    <CenterModal isOpen={isOpen} handleClose={handleClose}>
      <Button
        variant={"danger"}
        className="absolute -top-10 right-2"
        onClick={handleClose}
      >
        <IoClose />
      </Button>
      {newAvatar && (
        <img
          src={URL.createObjectURL(newAvatar)}
          className="w-80 h-80 rounded-full block mx-auto mb-2 border"
        />
      )}
      <p className="text-primary-text mb-3">
        JPG or PNG or JPEG no larger then 2MB
      </p>
      <FileUploader
        handleChange={(e) => setNewAvatar(e)}
        name="upload file"
        types={["png", "jpg", "jpeg"]}
        classes="!py-12"
        maxSize={2}
      />
      {newAvatar && (
        <Button
          variant={"success"}
          onClick={handleUpdateAvatar}
          className={"mx-auto mt-4"}
        >
          change <CgArrowsExchange className="text-3xl" />
        </Button>
      )}
    </CenterModal>
  );
};

export default ChangeUserAvatarModal;
