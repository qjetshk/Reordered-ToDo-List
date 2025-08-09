import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slices/todosSlice";
import { loadState, saveState } from "../utils/saveToLocalStorage";

const preloadedState = {
  todos: loadState()?.todos || [],
};

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    todos: store.getState().todos,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
