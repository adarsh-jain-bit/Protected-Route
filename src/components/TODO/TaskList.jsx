import React, { useContext, useState } from "react";
import { ContextData } from "../../Context/Context";
import { toast } from "react-toastify";

const TaskList = () => {
  const { todo, handleDelete, handleEdit, handleCheck, theme } =
    useContext(ContextData);
  const [editingTask, setEditingTask] = useState({ id: null, text: "" });
  const startEditing = (id, text) => {
    setEditingTask({ id, text });
  };

  const cancelEditing = () => {
    setEditingTask({ id: null, text: "" });
  };

  const saveEditing = () => {
    if (editingTask.text.trim() === "") {
      toast.error("Cannot Add Empty todo");
      return;
    }
    handleEdit(editingTask.id, editingTask.text);
    setEditingTask({ id: null, text: "" });
  };
  return (
    <>
      <div className="mt-4 flex flex-col w-1/2 mx-auto">
        <ul className="p-0 m-0">
          {todo.length > 0 &&
            todo.map(({ id, text, check }) => (
              <li
                className={`w-full flex justify-between p-2  mb-2 ${
                  theme ? "bg-slate-600" : "bg-slate-200"
                }`}
                key={id}
              >
                {editingTask.id === id ? (
                  <>
                    <input
                      type="text"
                      value={editingTask.text}
                      onChange={(e) =>
                        setEditingTask({
                          id: editingTask.id,
                          text: e.target.value,
                        })
                      }
                    />
                    <div>
                      <button className="bg-green-300" onClick={saveEditing}>
                        Save
                      </button>
                      <button className="bg-red-400" onClick={cancelEditing}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-4">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        onClick={() => handleCheck(id)}
                      />
                      <p className={`${check ? "line-through" : ""}`}>{text}</p>
                    </div>
                    <div>
                      <button
                        className="bg-blue-300 px-2 p-1 rounded-md me-2"
                        onClick={() => startEditing(id, text)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-400 px-2 p-1 rounded-md me-2"
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default TaskList;
