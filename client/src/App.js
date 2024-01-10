import { useState } from "react";
import Layout from "./pages/Layout/Layout";
import EventDash from "./pages/EventDash/EventDash";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Attend from "./pages/Attend/Attend";
import Contact from "./pages/Contact/Contact";
import ImageGallery from "./pages/Gallery/ImageGallery";

import AuthContext from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <SnackbarProvider maxSnack={3}>
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
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="About" element={<About />} />
                <Route path="Attend" element={<Attend />} />
                <Route path="Contact" element={<Contact />} />
                <Route path="Gallery" element={<ImageGallery />} />
              </Route>
              <Route path="/EventDash" element={<EventDash />} />
            </Routes>
          </div>
        </AuthContext.Provider>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
