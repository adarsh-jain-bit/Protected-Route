import React, { useContext, useEffect, useState } from "react";
import ResponsiveAppBar from "./Navbar";
import img from "../assets/download.png";
import { ContextData } from "../Context/Context";
const ProfilePage = () => {
  const { inputData } = useContext(ContextData);

  const [input, setInput] = useState({
    userName: "",
    email: "",
    mobile: "",
    address: "",
    error: {
      userName: "",
      email: "",
      address: "",
      mobile: "",
    },
  });

  // const { userName, email, password, mobile } = input.error;
  const validate = (val) => {
    let email = JSON.parse(localStorage.getItem("users")).filter((user) => {
      return user.email !== inputData.email;
    });
    let emailValidate = email.map((user) => user.email);
    let emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let phoneCheck = /^\d{10}$/g;
    if (val === "userName") {
      if (input.userName === "" || input.userName.length <= 2) {
        setInput((prev) => ({
          ...prev,
          error: { ...prev.error, userName: "*Invalid userName" },
        }));
      } else {
        setInput((prev) => ({
          ...prev,
          error: { ...prev.error, userName: "" },
        }));
      }
    }
    if (val === "address") {
      if (input.address === "" || input.address.length <= 2) {
        setInput((prev) => ({
          ...prev,
          error: { ...prev.error, address: "*Invalid address" },
        }));
      } else {
        setInput((prev) => ({
          ...prev,
          error: { ...prev.error, address: "" },
        }));
      }
    }
    if (val === "email") {
      if (emailCheck.test(input.email) !== true) {
        setInput((prev) => ({
          ...prev,
          error: { ...prev.error, email: "*Invalid email" },
        }));
      } else if (emailValidate.includes(input.email)) {
        setInput((prev) => ({
          ...prev,
          error: {
            ...prev.error,
            email: "email already exist cannot use this email",
          },
        }));
      } else {
        setInput((prev) => ({
          ...prev,
          error: { ...prev.error, email: "" },
        }));
      }
    }

    if (val === "mobile") {
      if (phoneCheck.test(input.mobile) !== true) {
        setInput((prev) => ({
          ...prev,
          error: {
            ...prev.error,
            mobile: "*Invalid Number",
          },
        }));
      } else {
        setInput((prev) => ({
          ...prev,
          error: {
            ...prev.error,
            mobile: "",
          },
        }));
      }
    }
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userData = existingUsers.find(
      (user) => user.email.toUpperCase() === inputData.email.toUpperCase()
    );
    if (userData) {
      setInput({
        ...input,
        ...userData,
      });
    }
  }, [inputData.email]);

  const handleSave = () => {
    if (
      input.userName == "" ||
      input.email == "" ||
      input.address == "" ||
      input.mobile == ""
    ) {
      alert("please fill the all field");
    } else if (
      input?.error?.userName !== "" ||
      input?.error?.email !== "" ||
      input?.error?.mobile !== "" ||
      input?.error?.address !== ""
    ) {
      alert(" please fill correctly");
    } else {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const upDataInputData = existingUsers.map((user) => {
        if (user.email.toUpperCase() == inputData.email.toUpperCase()) {
          return { ...user, ...input };
        }
        return user;
      });
      setEditable(!editable);
      localStorage.setItem("users", JSON.stringify(upDataInputData));
    }
  };
  const [editable, setEditable] = useState(false);
  const editButton = () => {
    setEditable(!editable);
  };
  console.log(input);
  return (
    <div className="bg-gray-100">
      <ResponsiveAppBar />
      <div className=" px-20 pt-10">
        <div className="flex flex-row gap-6">
          <div className="basis-1/4">
            <div className="flex gap-2 shadow-lg p-4 bg-white">
              <div className=" relative h-12 w-12 rounded-full border p-2 border-red-500">
                <img src={img} alt="" className="w-full h-full" />
              </div>
              <div>
                <p className="text-sm "> hello,</p>
                <p className="font-bold">{input.userName}</p>
              </div>
            </div>
            <div className=" gap-2 shadow-lg p-4 mt-6 bg-white">
              <p className="text-gray-500 font-bold">Account Settings</p>
              <hr className="my-2 " />
              <p className="font-sm text-zinc-600">Profile Information</p>
              <p className="font-sm text-zinc-600">Manage Address</p>
              <hr className="my-2 " />
            </div>
          </div>
          <div className="basis-3/4">
            <>
              <div className="isolate bg-white px-6 py-5 sm:py-5 lg:px-8">
                <div className="flex justify-between me-16 items-center">
                  <div className="text-xl font-bold mb-4">
                    Profile Information
                  </div>
                  <div
                    className="bg-blue-600  text-lg cursor-pointer px-2 text-white rounded-sm"
                    onClick={editButton}
                  >
                    {editable ? "Cancel" : "Edit"}
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="mb-6 ">
                    <div className="flex gap-4 items-center mb-3">
                      <label
                        htmlFor="default-input"
                        className="block  text-xl font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                    </div>
                    <input
                      type="text"
                      id="default-input"
                      value={input.userName}
                      onChange={(e) => handleData(e)}
                      name="userName"
                      className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled={!editable}
                      onKeyUp={(e) => validate(e.target.name)}
                    />
                    <div className="text-red-500 text-[12px] font-semibold mb-2">
                      {input?.error?.userName}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="mb-6 ">
                    <div className="flex gap-4 items-center mb-3">
                      <label
                        htmlFor="default-input"
                        className="block  text-xl font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                    </div>
                    <input
                      type="text"
                      id="default-input"
                      value={input.email}
                      onChange={(e) => handleData(e)}
                      name="email"
                      className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled={!editable}
                      onKeyUp={(e) => validate(e.target.name)}
                    />
                    <div className="text-red-500 text-[12px] font-semibold mb-2">
                      {input?.error?.email}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="mb-6">
                    <div className="flex gap-4 items-center mb-3">
                      <label
                        htmlFor="default-input"
                        className="block  text-xl font-medium text-gray-900 dark:text-white"
                      >
                        Mobile
                      </label>
                    </div>
                    <input
                      type="text"
                      id="default-input"
                      value={input.mobile}
                      onChange={(e) => handleData(e)}
                      name="mobile"
                      className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled={!editable}
                      onKeyUp={(e) => validate(e.target.name)}
                    />
                    <div className="text-red-500 text-[12px] font-semibold mb-2">
                      {input?.error?.mobile}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="mb-6">
                    <div className="flex gap-4 items-center mb-3">
                      <label
                        htmlFor="default-input"
                        className="block  text-xl font-medium text-gray-900 dark:text-white"
                      >
                        Address
                      </label>
                    </div>
                    <textarea
                      id="message"
                      rows="4"
                      name="address"
                      className="block p-2.5 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write your thoughts here..."
                      onChange={(e) => handleData(e)}
                      value={input.address}
                      disabled={!editable}
                      onKeyUp={(e) => validate(e.target.name)}
                    ></textarea>
                    <div className="text-red-500 text-[12px] font-semibold mb-2">
                      {input?.error?.address}
                    </div>
                  </div>
                </div>
                <button
                  className="bg-blue-600 text-lg w-32 text-center text-white px-2 py-1 rounded-lg ms-4"
                  onClick={handleSave}
                >
                  submit
                </button>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
