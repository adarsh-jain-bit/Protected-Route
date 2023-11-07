import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

import ProfilePage from "../components/ProfilePage";
import Home from "../components/Home";
import CompleteTask from "../components/TODO/CompleteTask";
import PendingTask from "../components/TODO/PendingTask";
export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/Profile",
    element: <ProfilePage />,
  },
  {
    path: "/complete",
    element: <CompleteTask />,
  },
  {
    path: "/pending",
    element: <PendingTask />,
  },
]);

export default Routes;
