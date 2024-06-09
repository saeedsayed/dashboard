import { onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUsersDocRef } from "../../firebase";
import { Button, CardBody, FullScreenLoading, Input } from "../../components";
import { ChangeUserAvatarModal } from "../../components/modals";
import { FaRegSave } from "react-icons/fa";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContextProvider } from "../../context/ContextProvider";
import { updateEmail, updateProfile } from "firebase/auth";
import { MdAddPhotoAlternate } from "react-icons/md";

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3)
    .max(16)
    .required("Please enter your first name"),
  lastName: yup.string().min(3).max(16).required("Please enter your last name"),
  // email: yup.string().email().required("Please enter your email"),
  phoneNumber: yup.string(),
  // .matches(
  //   /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
  //   "Phone number is not valid"
  // ),
  address: yup.string().max(16),
  birthday: yup.string(),
  social: yup.object().shape({
    Website: yup.string().max(30, "invalid URL"),
    // .matches(
    //   /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(\/.*)?$/,
    //   "invalid URL"
    // ),
    Facebook: yup.string().max(16, "Username must be at most 16 characters"),
    XTwitter: yup.string().max(16, "Username must be at most 16 characters"),
    Instagram: yup.string().max(16, "Username must be at most 16 characters"),
    Linkedin: yup.string().max(16, "Username must be at most 16 characters"),
    Github: yup.string().max(16, "Username must be at most 16 characters"),
  }),
});

const ProfileSetting = () => {
  const [userData, setUserData] = useState(null);
  const [avatarModal, setAvatarModal] = useState(false);
  const { adminUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const { setSnackbar } = useContextProvider();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submitProfileSetting = async (data) => {
    setLoading(true);
    const {
      firstName,
      lastName,
      // email,
      phoneNumber,
      address,
      birthday,
      social: { Website, Facebook, XTwitter, Instagram, Linkedin, Github },
    } = data;

    if (
      firstName == userData.firstName &&
      lastName == userData.lastName &&
      // email == userData.email &&
      phoneNumber == userData.phoneNumber &&
      address == userData.address &&
      birthday == userData.birthday &&
      Website == userData.socialLinks[0].userName &&
      Facebook == userData.socialLinks[1].userName &&
      XTwitter == userData.socialLinks[2].userName &&
      Instagram == userData.socialLinks[3].userName &&
      Linkedin == userData.socialLinks[4].userName &&
      Github == userData.socialLinks[5].userName
    ) {
      setSnackbar({
        isOpen: true,
        message: "Nothing changed",
        type: "danger",
      });
      setLoading(false);
      return;
    }
    try {
      // if (email !== userData.email) {
      //   await updateEmail(adminUser, email);
      //   await updateDoc(useUsersDocRef(adminUser.email), {
      //     email,
      //   });
      // }

      if (
        firstName !== userData.firstName ||
        lastName !== userData.last ||
        phoneNumber !== userData.phoneNumber
      ) {
        const fullName = firstName + " " + lastName;

        updateProfile(adminUser, {
          displayName: fullName,
          phoneNumber: phoneNumber,
        });
        await updateDoc(useUsersDocRef(adminUser.email), {
          firstName,
          lastName,
          phoneNumber,
        });
      }

      if (address !== userData.address || birthday !== userData.birthday) {
        await updateDoc(useUsersDocRef(adminUser.email), {
          address,
          birthday,
        });
      }

      if (
        Website !== userData.socialLinks[0].userName ||
        Facebook !== userData.socialLinks[1].userName ||
        XTwitter !== userData.socialLinks[2].userName ||
        Instagram !== userData.socialLinks[3].userName ||
        Linkedin !== userData.socialLinks[4].userName ||
        Github !== userData.socialLinks[5].userName
      ) {
        const socialLinks = userData.socialLinks.map((socialLink) => ({
          ...socialLink,
          userName: data?.social?.[socialLink.socialName],
        }));
        await updateDoc(useUsersDocRef(adminUser.email), {
          socialLinks,
        });
      }
      setSnackbar({
        isOpen: true,
        message: "Profile updated successfully",
        type: "success",
      });
    } catch (err) {
      setSnackbar({
        isOpen: true,
        message: "",
        type: "danger",
      });
    } finally {
      reset();
      setLoading(false);
    }
  };

  const getUserData = (_) => {
    onSnapshot(useUsersDocRef(adminUser.email), (userData) => {
      const res = userData.data();
      for (const key in res) {
        if (res[key] == null) {
          res[key] = "";
        }
      }
      for (const key in res.socialLinks) {
        if (res.socialLinks[key].userName == null) {
          res.socialLinks[key].userName = "";
        }
      }
      setUserData(res);
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
      <div className="flex flex-col gap-4">
        <CardBody>
          <div className="flex flex-col gap-4">
            <h3 className="bg-main-bg mb-4 py-3 ps-4 text-3xl font-bold border-b">
              Profile picture
            </h3>
            <img
              src={userData?.avatar}
              alt="avatar"
              className="w-80 aspect-square rounded-full mx-auto border-4 border-border "
            />
            <p className="text-center">
              JPG or PNG or JPEG no larger then 2 MB
            </p>
            <Button
              variant={"primary"}
              className={"mx-auto"}
              onClick={(_) => setAvatarModal(true)}
            >
              Upload new image <MdAddPhotoAlternate />
            </Button>
          </div>
        </CardBody>
        <CardBody>
          <div className="flex flex-col gap-4">
            <h3 className="bg-main-bg mb-4 py-3 ps-4 text-3xl font-bold border-b">
              Account Details
            </h3>
            <form onSubmit={handleSubmit(submitProfileSetting)}>
              <div className="flex gap-4 flex-wrap flex-col sm:flex-row">
                <div className="sm:w-[calc((100%-16px)/2)] w-full">
                  <Input
                    id={"firstName"}
                    label={"first name"}
                    defaultValue={userData.firstName}
                    err={errors?.firstName}
                    errMes={errors?.firstName?.message}
                    validRef={{ ...register("firstName") }}
                  />
                </div>
                <div className="sm:w-[calc((100%-16px)/2)] w-full">
                  <Input
                    id={"lastName"}
                    label={"last name"}
                    defaultValue={userData.lastName}
                    err={errors?.lastName}
                    errMes={errors?.lastName?.message}
                    validRef={{ ...register("lastName") }}
                  />
                </div>
                <div className="sm:w-[calc((100%-16px)/2)] w-full">
                  <Input
                    type={"email"}
                    label={"Email address"}
                    disabled
                    id={"email"}
                    defaultValue={userData.email}
                    err={errors?.email}
                    errMes={errors?.email?.message}
                    validRef={{ ...register("email") }}
                  />
                </div>
                <div className="sm:w-[calc((100%-16px)/2)] w-full">
                  <Input
                    id={"phoneNumber"}
                    type={"number"}
                    label={"phone number"}
                    defaultValue={userData.phoneNumber}
                    err={errors?.phoneNumber}
                    errMes={errors?.phoneNumber?.message}
                    validRef={{ ...register("phoneNumber") }}
                  />
                </div>
                <div className="sm:w-[calc((100%-16px)/2)] w-full">
                  <Input
                    id={"address"}
                    label={"Address"}
                    defaultValue={userData.address}
                    err={errors?.address}
                    errMes={errors?.address?.message}
                    validRef={{ ...register("address") }}
                  />
                </div>
                <div className="sm:w-[calc((100%-16px)/2)] w-full">
                  <Input
                    id={"birthday"}
                    type={"date"}
                    label={"birthday"}
                    defaultValue={userData.birthday}
                    err={errors?.birthday}
                    errMes={errors?.birthday?.message}
                    validRef={{ ...register("birthday") }}
                  />
                </div>
              </div>
              <div className="flex gap-2 gap-y-4 md:mt-8 mt-2 flex-wrap">
                {userData.socialLinks.map(
                  ({ baseUrl, userName, socialName }, index) => (
                    <div
                      className="flex-col flex w-full md:w-[calc(100%/3-6px)]"
                      key={socialName}
                    >
                      <label
                        htmlFor={socialName}
                        className="inline-block text-md mb-2 capitalize"
                      >
                        {socialName}
                        {errors?.social?.[socialName] && (
                          <span className="text-red-700 font-bold">
                            {errors?.social?.[socialName].message}
                          </span>
                        )}
                      </label>
                      <div className="flex w-full items-center isFocus">
                        <label
                          className={`ps-1 text-xs md:text-base border-r-0 border-secondary
                              [.isFocus:has(:focus)>&]:border-primary py-3  md:py-2 border-2 
                      rounded-l-md  ${
                        errors?.social?.[socialName] && "border-red-700"
                      }`}
                          htmlFor={socialName}
                        >
                          {baseUrl}
                        </label>
                        <input
                          id={socialName}
                          type="text"
                          className={`bg-transparent px-1 text-xs md:text-base border-l-0 border-secondary py-3
                          md:py-2 border-2 rounded-r-md focus:outline-none 
                          flex-1 w-0 focus-within:border-primary ${
                            errors?.social?.[socialName] && "border-red-700"
                          }`}
                          placeholder={
                            socialName +
                            (socialName == "Website" ? "Domain" : "Username")
                          }
                          defaultValue={userName}
                          {...register("social." + socialName)}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
              <Button variant={"success"} className={"w-full mt-4"}>
                Save changes <FaRegSave />
              </Button>
            </form>
          </div>
        </CardBody>
      </div>
      {/* Modal */}
      <ChangeUserAvatarModal
        isOpen={avatarModal}
        handleClose={(_) => setAvatarModal(false)}
        isUploadingAvatar={setLoading}
      />
    </>
  );
};

export default ProfileSetting;
