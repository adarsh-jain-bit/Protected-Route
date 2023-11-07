import React, { useState } from "react";
import { ContextData } from "./Context";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
export const StateContainer = ({ children }) => {
  const [theme, setTheme] = useState(false);
  const [inputData, setInputData] = useState({
    userName: "",
    email: "",
    password: "",
    mobile: "",
    error: {
      userName: "",
      email: "",
      password: "",
      mobile: "",
    },
  });
  const [submit, setSubmit] = useState(false);

  const { mobile, email, password, userName } = inputData;

  // show password
  const [show, setShow] = useState(false);
  const onShowPassword = () => {
    setShow(!show);
  };
  const handleData = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  // validation
  const validate = (val) => {
    // console.log("running");
    console.log(val);
    let emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let passwordCheck = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
    let phoneCheck = /^\d{10}$/g;
    if (val === "userName") {
      if (inputData.userName === "" || inputData.userName.length <= 2) {
        setInputData((prev) => ({
          ...prev,
          error: { ...prev.error, userName: "*Invalid userName" },
        }));
      } else {
        setInputData((prev) => ({
          ...prev,
          error: { ...prev.error, userName: "" },
        }));
      }
    }
    if (val === "email") {
      if (emailCheck.test(inputData.email) !== true) {
        setInputData((prev) => ({
          ...prev,
          error: { ...prev.error, email: "*Invalid email" },
        }));
      } else {
        setInputData((prev) => ({
          ...prev,
          error: { ...prev.error, email: "" },
        }));
      }
    }
    if (val === "password") {
      if (inputData.password.length <= 7) {
        setInputData((prev) => ({
          ...prev,
          error: {
            ...prev.error,
            password: "*password should be greater than 7 characters",
          },
        }));
      } else if (passwordCheck.test(inputData.password) !== true) {
        setInputData((prev) => ({
          ...prev,
          error: {
            ...prev.error,
            password: "*password must contain letters and numbers",
          },
        }));
      } else {
        setInputData((prev) => ({
          ...prev,
          error: {
            ...prev.error,
            password: "",
          },
        }));
      }
    }
    if (val === "mobile") {
      if (phoneCheck.test(inputData.mobile) !== true) {
        setInputData((prev) => ({
          ...prev,
          error: {
            ...prev.error,
            mobile: "*Invalid Number",
          },
        }));
      } else {
        setInputData((prev) => ({
          ...prev,
          error: {
            ...prev.error,
            mobile: "",
          },
        }));
      }
    }
  };
  const handleSubmit = () => {
    if (mobile === "" || email === "" || password === "" || userName === "") {
      setSubmit(false);
      validate();
    } else {
      const { mobile, email, password, userName } = inputData.error;
      if (mobile !== "" || email !== "" || password !== "" || userName !== "") {
        setSubmit(false);
        validate();
      } else {
        handleSignUp();
      }
    }
  };
  const handleSubmitlogin = () => {
    if (email === "" || password === "") {
      setSubmit(false);
      validate();
    } else {
      const { email, password } = inputData.error;
      if (email !== "" || password !== "") {
        setSubmit(false);
        validate();
      } else {
        handleLogin();
      }
    }
  };
  function hash(key) {
    let hash = 0;

    for (let i = 0; i < key.length; i++) {
      let char = key.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return hash;
  }

  const handleSignUp = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    // console.log("existingUsers", existingUsers);
    if (
      existingUsers.some(
        (user) => user.email.toUpperCase() === email.toUpperCase()
      )
    ) {
      toast.error("Account is already created");
      setSubmit(false);
    } else {
      setSubmit(true);
      let password2 = hash(password);
      existingUsers.push({ email, password2, mobile, userName });
      localStorage.setItem("users", JSON.stringify(existingUsers));
    }
  };
  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    console.log(existingUsers);
    if (
      existingUsers.some(
        (user) =>
          user.email.toUpperCase() === email.toUpperCase() &&
          user.password2 === hash(password)
      )
    ) {
      setSubmit(true);
    } else {
      setSubmit(false);
      toast.error("Account not Exist please sign in ");
    }
  };
  const cleanInfo = () => {
    setInputData((prev) => ({
      ...prev,
      userName: "",
      email: "",
      password: "",
      mobile: "",
      error: {
        userName: "",
        email: "",
        password: "",
        mobile: "",
      },
    }));
    setShow(false);
  };

  // todo
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleAddTodo = () => {
    setInput("");
    setTodo([...todo, { id: uuidv4(), text: input.trim(), check: false }]);
    toast.success("todo is Added");
  };
  const handleEdit = (taskId, newText) => {
    let updatedTodo = todo.map((task) => {
      if (task.id === taskId) {
        return { ...task, text: newText };
      }
      return task;
    });
    setTodo(updatedTodo);
    toast.success("Task updated successfully");
  };
  const handleDelete = (index) => {
    const DeleteTask = [...todo];
    DeleteTask.splice(index, 1);
    toast.error("todo is deleted");
    setTodo(DeleteTask);
  };
  const handleThemeChange = () => {
    setTheme(!theme);
  };
  const handleCheck = (taskId) => {
    let updatedTodo = todo.map((task) => {
      if (task.id === taskId) {
        return { ...task, check: !task.check };
      }
      return task;
    });
    setTodo(updatedTodo);
  };

  if (theme) {
    document.body.style.backgroundColor = "#2d3436";
    document.body.style.color = "white";
  } else {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  }
  console.log(todo);

  const data = {
    handleData,
    inputData,
    setInputData,
    show,
    onShowPassword,
    validate,
    handleSubmit,
    submit,
    handleSubmitlogin,
    setSubmit,
    cleanInfo,
    // todo
    handleAddTodo,
    handleInput,
    handleDelete,
    todo,
    input,
    handleThemeChange,
    theme,
    handleEdit,
    handleCheck,
  };
  return <ContextData.Provider value={data}>{children}</ContextData.Provider>;
};
