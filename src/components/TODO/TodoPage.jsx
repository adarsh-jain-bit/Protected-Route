import React from "react";
import AddTask from "./AddTask";
import TaskList from "../TODO/TaskList";

const TodoPage = () => {
  return (
    <>
      <AddTask />
      <TaskList />
      {/* lazy loading */}
    </>
  );
};

export default TodoPage;
