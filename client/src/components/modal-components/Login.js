import { useState, useContext } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Login = ({ onClose }) => {
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
    <div>
      <h1>Admin Login</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            id="username"
            
            autoComplete="username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            id="password"
            
            autoComplete="current-password"
          />
          <label htmlFor="password">Password:</label>
          <button type="submit">Login</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
