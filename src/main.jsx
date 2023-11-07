import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes/Index.jsx";
import { StateContainer } from "./Context/StateContainer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateContainer>
      <RouterProvider router={Routes} />
      <ToastContainer />
    </StateContainer>
  </React.StrictMode>
);
