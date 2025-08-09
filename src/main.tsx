import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App"; 
import { Provider } from "react-redux";
import { store } from "./store/store"; 

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
