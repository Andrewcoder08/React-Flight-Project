import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginContext, LoginProvider } from "./context/LoginContext.jsx";
import { FlightContext,FlightProvider } from "./context/FlightContext.jsx";
export { LoginContext,FlightContext };

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <LoginProvider>
        <FlightProvider>
        <App />
        </FlightProvider>
      </LoginProvider>
    </Router>
  </React.StrictMode>
);
