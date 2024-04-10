import React from "react";
import Home from "./Home";
import "./Login.css";
import { LoginContext } from "../main";
import { useContext } from "react";

export default function Login() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    loggedIn,
    handleLogin,
  } = useContext(LoginContext);

  return (
    <div>
      {loggedIn ? (
        <Home />
      ) : (
        <div className="login-container">
          <h2 className="login-header">Login</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <div>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      )}
    </div>
  );
}
