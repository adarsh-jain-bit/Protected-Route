import React, { useContext, useEffect } from "react";
import Input from "./INput";
import { Link } from "react-router-dom";
import { ContextData } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const {
    inputData,
    handleData,
    show,
    onShowPassword,
    validate,
    submit,
    handleSubmit,
    handleSubmitlogin,
    cleanInfo,
  } = useContext(ContextData);
  const { email, password, error } = inputData;
  useEffect(() => {
    if (submit) {
      navigate("/home");
      toast.success("successfully login!");
    }
  }, [submit]);
  return (
    <>
      <div className="w-full h-full bg-gray-200">
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded-lg shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Login</h1>
              <p className="mb-1 font-semibold">Your email</p>
              <Input
                placeholder="Enter your email"
                type="email"
                value={email}
                name="email"
                handleData={handleData}
                validate={validate}
                error={error.email}
              />

              <p className="mb-1 font-semibold">Password</p>
              <Input
                placeholder="Enter your password"
                type={show ? "text" : "password"}
                value={password}
                handleData={handleData}
                name="password"
                validate={validate}
                error={error.password}
                show={show}
                onShowPassword={onShowPassword}
              />
              <p className=" text-end text-green-500">Forget password?</p>
              <button
                type="submit"
                className="w-full text-center py-3 text-lg rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none mt-8"
                onClick={handleSubmitlogin}
              >
                Log in
              </button>
              <div className="text-grey-dark mt-6 text-center">
                Dont have an account?
              </div>
              <Link to="/signup" onClick={cleanInfo}>
                <button
                  type="submit"
                  className="w-full text-center py-3 rounded border border-green-400 text-green-500 hover:bg-green-dark focus:outline-none mt-3"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
