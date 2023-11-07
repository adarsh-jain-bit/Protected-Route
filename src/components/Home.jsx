import React from "react";
import ResponsiveAppBar from "./Navbar";
import TodoPage from "./TODO/TodoPage";
const Home = () => {
  return (
    <>
      <ResponsiveAppBar />
      <TodoPage />
    </>
  );
};

export default Home;
