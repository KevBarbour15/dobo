import { useState, useContext } from "react";
import "./login.css";
import axios from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState(""); // change these later to empty strings when done testing
  const [password, setPassword] = useState(""); // and add required to the inputs
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      setTimeout(() => {
        navigate("/EventDash");
      }, 1500);
    } catch (error) {}
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="form-element login"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username:"
          id="username"
          autoComplete="username"
          required
        />
        <input
          className="form-element login"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password:"
          id="password"
          autoComplete="current-password"
          required
        />
        <button className="button login" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
