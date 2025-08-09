import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTodo } from "@/types/Todo.type";

const getInitialState = (): TTodo[] => {
  try {
    const saved = localStorage.getItem("todosState");
    return saved ? JSON.parse(saved).todos : [];
  } catch {
    return [];
  }
};

const initialState: TTodo[] = getInitialState();

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state: TTodo[], action: PayloadAction<string>): TTodo[] => {
      const trimmedInput = action.payload.trim();
      if (!trimmedInput) return state;

      const maxId = state.reduce((acc, todo) => Math.max(acc, todo.id), 0);

      return [
        ...state,
        {
          id: maxId + 1,
          title: trimmedInput,
          isChecked: false,
          createdAt: new Date().toISOString(),
        },
      ];
    },

    removeTodo: (state: TTodo[], action: PayloadAction<number>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },

    removeAll: (state): TTodo[] => {
      return [];
    },

    checkTodo: (state: TTodo[], action: PayloadAction<number>) => {
      const todoId = action.payload;
      const todo = state.find((todo) => todo.id === todoId);

      if (todo) todo.isChecked = !todo.isChecked;
    },

    reorderTodos: (state: TTodo[], action: PayloadAction<TTodo[]>) => {
      const checkedTodos = state.filter((todo) => todo.isChecked);
      return [...action.payload, ...checkedTodos];
    },

    updateTodo: (state: TTodo[], action: PayloadAction<{todoId: number, newTitle: string}>) => {
      const { todoId, newTitle } = action.payload;
      const todo = state.find((todo) => todo.id === todoId);

      if (todo) todo.title = newTitle;
    },
  },
});

export const { addTodo, removeTodo, checkTodo, removeAll, reorderTodos, updateTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
