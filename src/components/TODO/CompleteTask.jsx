import React from "react";
import Navbar from "../Navbar";
import { useContext } from "react";
import { ContextData } from "../../Context/Context";
const CompleteTask = () => {
  const { todo, theme } = useContext(ContextData);
  let update = [];
  try {
    update = todo?.filter((task) => task.check !== false);
    console.log(update);
  } catch (err) {
    console.log(err);
  }
  return (
    <>
      <Navbar />
      <h1 className="text-4xl mt-8 text-center mb-8">Completed Task</h1>
      {update.length > 0 &&
        update.map((task) => (
          <div
            className={`${
              theme ? "bg-slate-600" : "bg-slate-200"
            } mb-2 p-2 w-52 m-auto`}
          >
            <li className="list-none">{task.text}</li>
          </div>
        ))}
    </>
  );
};

export default CompleteTask;
