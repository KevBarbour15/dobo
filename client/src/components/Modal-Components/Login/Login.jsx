import { useState, useContext } from "react";
import "./login.scss";

import { useNavigate } from "react-router-dom";

// notification imports
import { toast } from "react-toastify";
import Toast from "../../Toast/Toast.jsx";

// component imports
import axios from "../../../axiosConfig.jsx";
import AuthContext from "../../../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const successMessage = "Login successful! Redirecting...";
  const errorMessage = "Login failed. Please try again.";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/auth/login", {
        username,
        password,
      });

      sessionStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);

      toast(<Toast message={successMessage} />, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/EventDash");
      }, 1500);
    } catch (error) {
      toast(<Toast message={errorMessage} />, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <span className="dash-info-line">
          Username:
          <input
            className="form-element login"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            autoComplete="username"
            required
          />
        </span>
        <span className="dash-info-line">
          Password:
          <input
            className="form-element login"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            autoComplete="current-password"
            required
          />
        </span>
        <button className="button login" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
