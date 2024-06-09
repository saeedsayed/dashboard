import React, { useEffect, useState } from "react";
import { Button, CardBody, FullScreenLoading, Input } from "../../components";
import { FaRegSave } from "react-icons/fa";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { deleteUser, updatePassword } from "firebase/auth";
import { useContextProvider } from "../../context/ContextProvider";
import { useAuth } from "../../context/AuthContext";
import CenterModal from "../../components/modals/CenterModal";
import { IoWarningOutline } from "react-icons/io5";
import { deleteDoc } from "firebase/firestore";
import { storage, useUsersDocRef } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";

const validationSchema = yup.object().shape({
  newPassword: yup.string().min(6).required("Please enter your new password"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your new password"),
});

const SecuritySetting = () => {
  const { adminUser } = useAuth();
  const { setSnackbar } = useContextProvider();
  const [loading, setLoading] = useState(false);
  const [confirmDeleteEmail, setConfirmDeleteEmail] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState({
    deleteAccount: false,
    changePassword: false,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSubmitForm = (data) => {
    setModalIsOpen((p) => ({ ...p, changePassword: data }));
  };

  const handleDeleteAccount = async () => {
    if (confirmDeleteEmail !== adminUser.email) {
      setSnackbar({
        isOpen: true,
        message: "Email does not match",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const storageRef = ref(storage, `userAvatars/${adminUser.email} avatar`);
      await deleteDoc(useUsersDocRef(adminUser.email));
      await deleteObject(storageRef);
      await deleteUser(adminUser);
      setSnackbar({
        isOpen: true,
        message: "Account deleted successfully",
        type: "success",
      });
      setConfirmDeleteEmail("");
    } catch (err) {
      console.log(err.message);
      setSnackbar({
        isOpen: true,
        message: "Account not deleted",
        type: "error",
      });
    } finally {
      setLoading(false);
      setModalIsOpen((p) => ({ ...p, deleteAccount: false }));
    }
  };
  const handleChangePassword = async (data) => {
    setLoading(true);
    try {
      await updatePassword(adminUser, data.newPassword);
      setSnackbar({
        isOpen: true,
        message: "Password changed successfully",
        type: "success",
      });
      reset();
    } catch (error) {
      setSnackbar({
        isOpen: true,
        message:
          "Password has not been changed. Please log in again and try again",
        type: "error",
        closeAfter: 7000,
      });
    } finally {
      setModalIsOpen((p) => ({ ...p, changePassword: false }));
      setLoading(false);
    }
  };

  if (loading) {
    return <FullScreenLoading />;
  }


  return (
    <>
      <div className="flex gap-4 flex-wrap items-start mt-8">
        {/* left col  */}
        <div className="flex flex-col gap-4 flex-1 md:min-w-[400px]">
          <CardBody>
            <h3 className="bg-main-bg px-4 py-2 md:text-3xl text-xl mb-2 font-bold">
              Change Password
            </h3>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <Input
                type={"password"}
                label={"new password"}
                id={"newPassword"}
                validRef={{ ...register("newPassword") }}
                err={errors.newPassword}
                errMes={errors?.newPassword?.message}
              />
              <Input
                type={"password"}
                label={"confirm new password"}
                id={"confirmNewPassword"}
                validRef={{ ...register("confirmNewPassword") }}
                err={errors.confirmNewPassword}
                errMes={errors?.confirmNewPassword?.message}
              />
              <Button
                variant={"success"}
                className={"px-8d py-d4 text-lg mt-5 md:mt-0"}
              >
                save <FaRegSave />
              </Button>
            </form>
          </CardBody>
        </div>
        {/* right col */}
        <div className="md:min-w-96 md:max-w-sm flex-1 md:flex-none border-red-600 border rounded-radius">
          <CardBody>
            <h3 className="bg-main-bg px-4 py-2 md:text-3xl text-xl mb-2 font-bold text-red-700">
              Delete Account
            </h3>
            <p className="mb-4 text-red-800 text-lg font-bold">
              Deleting your account is a permanent action and cannot be undone.
              If you are sure you want to delete your account, select the button
              below.
            </p>
            <Button
              variant={"danger"}
              className={"px-8d py-d4 text-lg mt-5 md:mt-0 mx-auto"}
              onClick={(_) =>
                setModalIsOpen((p) => ({ ...p, deleteAccount: true }))
              }
            >
              I understand, delete my account
            </Button>
          </CardBody>
        </div>
      </div>
      {/* Modal */}
      {/* change password modal */}
      <CenterModal
        isOpen={modalIsOpen.changePassword}
        handleClose={(_) =>
          setModalIsOpen((p) => ({ ...p, changePassword: false }))
        }
      >
        <h3 className="text-center font-bold text-3xl mb-4 text-primary-text">
          Change Password
        </h3>
        <div className="flex justify-evenly items-center">
          <Button
            variant={"danger"}
            onClick={(_) => handleChangePassword(modalIsOpen.changePassword)}
          >
            Change
          </Button>
          <Button
            variant={"secondary"}
            onClick={(_) =>
              setModalIsOpen((p) => ({ ...p, changePassword: false }))
            }
          >
            cancel
          </Button>
        </div>
      </CenterModal>
      {/* delete account modal */}
      <CenterModal
        isOpen={modalIsOpen.deleteAccount}
        handleClose={(_) =>
          setModalIsOpen((p) => ({ ...p, deleteAccount: false }))
        }
      >
        <h3 className="text-center font-bold  text-3xl mb-4 text-primary-text">
          Delete Account
        </h3>
        <Input
          type={"text"}
          label={`for delete your account please inter your email "${adminUser.email}"`}
          id={"confirmEmail"}
          autoComplete="off"
          onChange={(e) => setConfirmDeleteEmail(e.target.value)}
          value={confirmDeleteEmail}
        />
        <div className="flex justify-evenly items-center mt-4 md:mt-0">
          <Button variant={"danger"} onClick={handleDeleteAccount}>
            delete account <IoWarningOutline />
          </Button>
          <Button
            variant={"success"}
            className={"px-10"}
            onClick={(_) =>
              setModalIsOpen((p) => ({ ...p, deleteAccount: false }))
            }
          >
            cancel
          </Button>
        </div>
      </CenterModal>
    </>
  );
};

export default SecuritySetting;
