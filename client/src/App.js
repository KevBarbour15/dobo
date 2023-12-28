import { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import EventDash from "./pages/EventDash/EventDash";
import AuthContext from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          isAuthenticated,
          setIsAuthenticated,
        }}
      >
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/EventDash" element={<EventDash />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
