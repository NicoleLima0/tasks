import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/sass/main.scss";
import App from "./App.jsx";
import "primereact/resources/themes/lara-light-cyan/theme.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
