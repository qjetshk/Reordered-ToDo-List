import { useState, useMemo } from "react";
import "./index.css";
import Todo from "./components/Todo";
import Bin from "./components/Bin";
import { Reorder } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeAll, reorderTodos } from "./store/slices/todosSlice";

import { TTodo } from "./types/Todo.type";
import { AppDispatch, RootState } from "./store/store";


function App() {
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const activeTodos = useSelector((state: RootState) =>
    state.todos.filter((todo) => !todo.isChecked)
  );
  const checkedTodos = useSelector((state: RootState) =>
    state.todos.filter((todo) => todo.isChecked)
  );

  const filteredActiveTodos = useMemo(() => {
    return activeTodos.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTodos, searchQuery]);

  const filteredCheckedTodos = useMemo(() => {
    return checkedTodos.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTodos, searchQuery]);

  const handleAddTodo = () => {
    dispatch(addTodo(input));
    setInput("");
  };

  const handleReorder = (newOrder: TTodo[]) => {
    dispatch(reorderTodos(newOrder));
  };

  return (
    <section className="px-5">
      <section className="max-w-[800px] mx-auto mt-15">
        <h1 className="text-[36px] font-bold text-[#3d3d3d] text-center">
          Reordered ToDo List
        </h1>
        <div className="flex p-10 gap-3 justify-around max-w-[500px] mx-auto">
          <div onClick={() => dispatch(removeAll())}>
            <Bin size={30} color={"#FF8E8E"} />
          </div>
          <input
            maxLength={100}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
            className="border-2 border-[#3d3d3d] px-4 py-2 rounded-[10px] outline-none"
            type="text"
          />
          <button
            onClick={() => handleAddTodo()}
            className="cursor-pointer transition-colors duration-200 hover:bg-[#5990ffc5] rounded-[10px] bg-[#5990ff] text-white px-5 text-2xl"
          >
            +
          </button>
        </div>

        <section className="rounded-[15px] bg-[#f4f4f4] w-full px-10 pt-6 pb-7 mb-10">
          <section className="flex justify-between gap-3 items-center mb-5">
            <h1 className="font-medium text-xl">Активные задачи:</h1>
            <input
              
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className=" bg-[#eaeaea] px-3 py-1.5 rounded-[10px] outline-none"
              type="text"
              placeholder="найти..."
            />
          </section>
          <Reorder.Group values={activeTodos} onReorder={handleReorder}>
            <ul className="flex flex-col gap-4">
              {activeTodos.length > 0 ? (
                filteredActiveTodos.length != 0 ? (
                  filteredActiveTodos.map((todo, index) => (
                    <Reorder.Item key={todo.id} value={todo}>
                      <Todo todo={todo} index={index + 1} />
                    </Reorder.Item>
                  ))
                ) : (
                  <span className="text-[20px] text-[#3d3d3d] text-center">
                    Ничего не нашлось(
                  </span>
                )
              ) : (
                <span className="text-[20px] text-[#3d3d3d] text-center">
                  Здесь пока ничего нет
                </span>
              )}
            </ul>
          </Reorder.Group>
        </section>

        {checkedTodos.length != 0 ? (
          <section className="rounded-[15px] bg-[#f4f4f4] w-full px-10 pt-6 pb-7 ">
            <h1 className="font-medium mb-5 text-xl">Завершенные задачи:</h1>
            <ul className="flex flex-col gap-4">
              {filteredCheckedTodos.length > 0 ? (
                filteredCheckedTodos.map((todo, i) => (
                  <Todo todo={todo} index={i + 1} />
                ))
              ) : (
                <span className="text-[20px] text-[#3d3d3d] text-center">
                  Ничего не нашлось(
                </span>
              )}
            </ul>
          </section>
        ) : null}
      </section>
    </section>
  );
}

export default App;
