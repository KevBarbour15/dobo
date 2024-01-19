import { useState, useContext } from "react";
import "./login.css";
import axios from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("dobo"); // change these later to empty strings when done testing
  const [password, setPassword] = useState("dobo"); // and add required to the inputs
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
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="USERNAME"
          id="username"
          autoComplete="username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="PASSWORD"
          id="password"
          autoComplete="current-password"
          required
        />
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
