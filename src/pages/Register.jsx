import React, { useEffect } from "react";
import { Button, FullScreenLoading, Input } from "../components";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../context/ContextProvider";

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3)
    .max(16)
    .required("Please enter your first name"),
  lastName: yup.string().min(3).max(16).required("Please enter your last name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const Register = () => {
  const { adminUser, handleRegister, authError } = useAuth();
  const { setSnackbar } = useContextProvider();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submitRegister = (data) => {
    const displayName = data.firstName + " " + data.lastName;
    handleRegister(data.email, data.password, displayName);
  };

  useEffect(() => {
    if (adminUser) {
      navigate("/user-profile");
    }
  }, [adminUser]);

  useEffect(() => {
    if (authError.registerErr) {
      setSnackbar({
        isOpen: true,
        message: "the email is existing",
        type: "",
      });
    }
  }, [authError.registerErr]);

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
              <form onSubmit={handleSubmit(submitRegister)} className="max-w-[450px]">
                <div className="pb-3">
                  <span className="text-sm text-primary-text">
                    Welcome to our dashboard{" "}
                    <span className="text-2xl">👋</span>
                  </span>
                  <h1 className="text-2xl font-bold md:min-w-[400px] min-w-[300px]">
                    Start now and create your account
                  </h1>
                </div>
                <div className="flex gap-2 items-end">
                  <Input
                    id="firstName"
                    err={errors?.firstName}
                    errMes={errors?.firstName?.message}
                    autoFocus
                    autoComplete="off"
                    label={"first name"}
                    validRef={{ ...register("firstName") }}
                  />
                  <Input
                    id="last name"
                    err={errors?.lastName}
                    errMes={errors?.lastName?.message}
                    autoFocus
                    autoComplete="off"
                    label={"last name"}
                    validRef={{ ...register("lastName") }}
                  />
                </div>
                <Input
                  id="email"
                  err={errors?.email}
                  errMes={errors?.email?.message}
                  type="email"
                  label={"email"}
                  validRef={{ ...register("email") }}
                />
                <Input
                  id="password"
                  err={errors?.password}
                  errMes={errors?.password?.message}
                  type="password"
                  label={"password"}
                  validRef={{ ...register("password") }}
                />
                <Input
                  id="confirmPassword"
                  err={errors?.confirmPassword}
                  errMes={errors?.confirmPassword?.message}
                  type="password"
                  label={"Confirm Password"}
                  validRef={{ ...register("confirmPassword") }}
                />
                <div className="">
                  <Button
                  variant={'primary'}
                  className={'w-full my-4'}
                  //   className="mt-4 mb-6 w-full bg-secondary hover:bg-primary
                  // py-2 rounded-md transition duration-100 text-gray-50"
                  >
                    Create Account
                  </Button>
                </div>
              </form>
              {authError.registerErr && (
                <p className="text-red-700 text-lg font-bold capitalize mb-4">
                  the email is existing
                </p>
              )}
              <p>
                {" "}
                Do you have an account?{" "}
                <Link
                  to={"/login"}
                  className="cursor-pointer text-blue-600 hover:text-blue-400"
                >
                  
                  {" "}
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
