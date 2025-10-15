import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import { AlertProvider } from "./servics/ApiChanger.jsx";
import "./i18n.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <AlertProvider>
           <App />
    </AlertProvider>
    </BrowserRouter>
  </StrictMode>
);
