import { useState, useEffect } from "react";

// component imports
import axios from "../axiosConfig.jsx";
import AuthContext from "./AuthContext.jsx";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("Hit this route");
    const validateToken = async () => {
      const token = sessionStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get("/auth/validate-token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.valid) {
            console.log("Token is valid");
            setIsAuthenticated(true);
          } else {
            throw new Error("Token validation failed at server");
          }
        } catch (err) {
          sessionStorage.removeItem("token");
          setIsAuthenticated(false);
          console.error("Error during token validation:", err);
        }
      } else {
        console.log("No token found in storage.");
      }
    };

    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
