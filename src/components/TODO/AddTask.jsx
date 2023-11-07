import React, { useContext, useState } from "react";
import { ContextData } from "../../Context/Context";
const AddTask = () => {
  const { handleAddTodo, handleInput, todo, input } = useContext(ContextData);
  return (
    <div className="mt-4 flex flex-col justify-center items-center">
      <h1 className="text-5xl text-center">Todo List</h1>
      <div>
        <input
          className="border  mt-8 p-2 text-black"
          value={input}
          onChange={(e) => handleInput(e)}
        />
        <button className="ms-2 bg-green-600 p-2" onClick={handleAddTodo}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTask;
