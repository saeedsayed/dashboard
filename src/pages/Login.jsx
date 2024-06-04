import React, { useEffect } from "react";
import { FullScreenLoading, Input } from "../components";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../context/ContextProvider";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { authLoading, adminUser, handleLogin, authError } = useAuth();
  const { setSnackbar } = useContextProvider();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submitLogin = (data) => {
    handleLogin(data.email, data.password);
  };

  useEffect(() => {
    if (adminUser) {
      navigate("/");
    }
  }, [adminUser]);
  useEffect(() => {
    if (authError.loginErr) {
      setSnackbar({
        isOpen: true,
        message: "email or password is incorrect",
        type: "",
      });
    }
  }, [authError.loginErr]);

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
          <div className="bg-main-bg min-h-screen md:w-1/2 w-full flex justify-center items-center px-4">
            <div>
              <form onSubmit={handleSubmit(submitLogin)}>
                <div className="pb-3">
                  <span className="text-sm text-white">
                    Welcome to our dashboard{" "}
                    <span className="text-2xl">👋</span>
                  </span>
                  <h1 className="text-2xl font-bold md:min-w-[400px] min-w-[300px]">
                    Login
                  </h1>
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
                <div className="">
                  <button
                    className="mt-4 mb-3 w-full bg-secondary hover:bg-primary
                  py-2 rounded-md transition duration-100 text-gray-50"
                  >
                    Login
                  </button>
                </div>
              </form>
              {authError.loginErr && (
                <p className="text-red-700 text-lg font-bold">
                  email or password is incorrect
                </p>
              )}
              <Link
                to={"/reset-password"}
                className="my-4 block text-blue-600 hover:text-blue-400"
              >
                forget password
              </Link>
              <p>
                {" "}
                Do you have an account?{" "}
                <Link
                  to={"/register"}
                  className="cursor-pointer text-blue-600 hover:text-blue-400"
                >
                  {" "}
                  sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
