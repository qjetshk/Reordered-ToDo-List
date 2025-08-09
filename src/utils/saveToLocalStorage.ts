import { RootState } from "@/store/store";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("todosState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.warn("Не получилось загрузить тудушки из локалстораджа(", e);
    return undefined;
  }
};

const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("todosState", serializedState);
  } catch (e) {
    console.warn("Не получилось сохранить тудушки в локалсторадж(", e);
  }
};

export { loadState, saveState };
