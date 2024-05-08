import { useState, useEffect } from "react";

// component imports
import axios from "../axiosConfig.jsx";
import AuthContext from "./AuthContext.jsx";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("Hit this route");
    const validateToken = async () => {
      const token = localStorage.getItem("token");
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
          }
        } catch (err) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          console.log(err);
        }
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
