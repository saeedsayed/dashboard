import React, { useEffect, useState } from "react";
import { FullScreenLoading, Input } from "../components";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { motion } from "framer-motion";

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "visible",
    backgroundColor: "transparent",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
});

const ResetPassword = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { authLoading, adminUser, handleResetPassword } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submitRegister = async (data) => {
    await handleResetPassword(data.email);
    setModalIsOpen(true);
  };

  useEffect(() => {
    if (adminUser) {
      navigate("/");
    }
  }, [adminUser]);

  if (authLoading) {
    return <FullScreenLoading />;
  }
  return (
    <>
      <div
        className="min-h-screen bg-no-repeat bg-cover bg-center w-full"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=htmlFormat&fit=crop&w=1050&q=80')",
        }}
      >
        <div className="flex justify-end">
          <div className="bg-main-bg min-h-screen w-full md:w-1/2 flex justify-center items-center px-4">
            <div>
              <form onSubmit={handleSubmit(submitRegister)}>
                <div className="pb-3 md:min-w-[400px] min-w-[300px]">
                  <span className="text-sm text-white">
                    Welcome to our dashboard{" "}
                    <span className="text-2xl">👋</span>
                  </span>
                  <h1 className="text-2xl font-bold ">
                    Forgot password?
                  </h1>
                </div>
                <Input
                  id="email"
                  err={errors?.email}
                  errMes={errors?.email?.message}
                  type="email"
                  label={"email address"}
                  validRef={{ ...register("email") }}
                />
                <div className="">
                  <button
                    className="mt-4 mb-3 w-full bg-secondary hover:bg-primary
                  py-2 rounded-md transition duration-100 text-gray-50"
                  >
                    Send email to reset password
                  </button>
                </div>
              </form>
              <p className="mt-4">
                {" "}
                Remember you password? 
                <Link
                  to={"/login"}
                  className="cursor-pointer  text-blue-600 hover:text-blue-400"
                >
                  {" "}
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={modalIsOpen} style={customModalStyles}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-main-bg p-6 w-[400px] rounded-radius"
        >
          <h1 className="text-2xl font-bold text-gray-50">
            Check your email to reset your password
          </h1>
          <Link
            to={'/login'}
            className="block text-center mt-4 mb-3 w-full bg-secondary hover:bg-primary
                  py-2 rounded-md transition duration-100 text-gray-50 "
            onClick={(_) => setModalIsOpen(false)}
          >
            Back to login
          </Link>
        </motion.div>
      </Modal>
    </>
  );
};

export default ResetPassword;
