import React, { useState, useEffect } from "react";
import Bin from "./Bin";
import { useDispatch } from "react-redux";
import { removeTodo, checkTodo, updateTodo } from "../store/slices/todosSlice";
import Edit from "./Edit";
import Apply from "./Apply";

import { TTodo } from "@/types/Todo.type";
import { AppDispatch } from "@/store/store";

type TTodoProps = {
  todo: TTodo;
  index: number;
};

function Todo({ todo, index }: TTodoProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(todo.title);

  useEffect(() => {
    !isEditing && setInput(todo.title);
  }, [todo.title, isEditing]);

  const toUpdate = () => {
    if (input.trim()) {
      dispatch(
        updateTodo({
          todoId: todo.id,
          newTitle: input,
        })
      );
    }
    setIsEditing(false);
  };

  const validateDate = (date: string) => {
    const year = new Date(date).toLocaleDateString().slice(8);
    const rest = new Date(date).toLocaleDateString().slice(0, 6);
    return rest + year;
  };

  return (
    <li
      className={`${
        todo.isChecked ? "opacity-50 pl-3 tablet:pl-6" : "cursor-grab"
      } bg-[#dde8ff] pl-2 tablet:pl-3 pr-4 tablet:pr-6 py-3 rounded-[10px] flex items-center`}
    >
      {!todo.isChecked && (
        <span className="font-bold text-[14px] pr-2 tablet:pr-4 text-[#5990ffc5]">⋮⋮</span>
      )}
      <div className="flex gap-3 items-center flex-1 min-w-0">
        <input
          checked={todo.isChecked}
          onChange={() => dispatch(checkTodo(todo.id))}
          type="checkbox"
          className="cursor-pointer w-5 border-2 border-[#5990ffc5] h-5 rounded-full appearance-none checked:bg-[#5990ffc5] flex-shrink-0"
        />

        <span
          className={`${
            todo.isChecked && "line-through"
          } text-[#3d3d3d] text-lg flex-1 min-w-0 break-words whitespace-normal`}
        >
          <span className="font-semibold mr-1 flex-shrink-0">
            {!todo.isChecked && `${index}.`}
          </span>
          {isEditing ? (
            <input
              value={input}
              type="text"
              className="outline-none flex-1 w-full min-w-0 bg-transparent"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") toUpdate();
                else if (e.key === "Escape") setIsEditing(false);
              }}
              autoFocus
            />
          ) : (
            <span className="flex-1">{todo.title}</span>
          )}
        </span>
      </div>
      <div className="grid tablet:grid-cols-2 grid- grid-cols-1 gap-2 ml-2.5">
        <div className="flex gap-3 justify-center">
          {!todo.isChecked &&
            (isEditing ? (
              <Apply onApply={toUpdate} />
            ) : (
              <Edit setIsEditing={setIsEditing} />
            ))}

          <button onClick={() => dispatch(removeTodo(todo.id))}>
            <Bin size={20} color={"#FF8E8E"} />
          </button>
        </div>

        <div className="grid grid-cols-1 tablet:order-[-1]">
          <span className="opacity-50 text-[#5990ffc5] text-[12px] text-center">
            {validateDate(todo.createdAt)}
          </span>
          <span className="opacity-50 text-[#5990ffc5] text-[12px] text-center">
            {new Date(todo.createdAt).toLocaleTimeString().slice(0, 5)}
          </span>
        </div>
      </div>
    </li>
  );
}

export default Todo;
