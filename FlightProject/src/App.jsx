import "./App.css";
import { Routes, Route, Link, NavLink } from "react-router-dom";

import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import { LoginContext } from "./main";
import { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function App() {
  const { loggedIn, handleLogout } = useContext(LoginContext);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setOpen(false);
  };
  return (
    <div className="App">
      <nav>
        <div className="header">Flight Website</div>
        <div>
          {loggedIn ? (
            <>
              <NavLink
                to="/"
                className="navLink"
                activeclassname="active"
                onClick={() => setOpen(true)}
              >
                LOGOUT
              </NavLink>
              {/* when true open dialog */}
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                  <DialogContentText className="dialogContentText">
                    Are you sure you want to logout?
                  </DialogContentText>
                </DialogContent>
                <DialogActions className="dialogActions">
                  <NavLink to="/home" className="navLink" onClick={handleClose}>
                    <Button
                      variant="contained"
                      color="primary"
                      className="custom-button"
                    >
                      {" "}
                      No
                    </Button>
                  </NavLink>
                  <NavLink
                    to="/"
                    className="navLink"
                    onClick={handleConfirmLogout}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      className="custom-button"
                    >
                      {" "}
                      Yes
                    </Button>
                  </NavLink>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            ""
          )}

          {loggedIn && (
            <NavLink to="/home" className="navLink" activeclassname="active">
              HOME
            </NavLink>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}
