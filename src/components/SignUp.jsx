import React, { useContext, useEffect } from "react";
import Input from "./INput";
import { Link } from "react-router-dom";
import { ContextData } from "../Context/Context";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const {
    inputData,
    handleData,
    show,
    onShowPassword,
    validate,
    handleSubmit,
    submit,
    cleanInfo,
  } = useContext(ContextData);
  console.log(inputData);
  const navigate = useNavigate();
  const { userName, email, password, mobile, error } = inputData;
  useEffect(() => {
    if (submit) {
      navigate("/home");
    }
  }, [submit]);
  return (
    <div className="w-full h-full bg-gray-200">
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <Input
              placeholder="userName"
              type="text"
              name="userName"
              value={userName}
              handleData={handleData}
              validate={validate}
              error={error.userName}
            />
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              handleData={handleData}
              validate={validate}
              error={error.email}
            />
            <Input
              placeholder="password"
              type={show ? "text" : "password"}
              name="password"
              value={password}
              handleData={handleData}
              validate={validate}
              error={error.password}
              show={show}
              onShowPassword={onShowPassword}
            />
            <Input
              placeholder="mobile No."
              type="tel"
              name="mobile"
              value={mobile}
              handleData={handleData}
              validate={validate}
              error={error.mobile}
            />
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1"
              onClick={() => handleSubmit()}
            >
              Create Account
            </button>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <Link to="/" onClick={cleanInfo}>
              <a className="no-underline border-b border-blue-500 text-blue-500 font-bold ms-2">
                Log in
              </a>
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
