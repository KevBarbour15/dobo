import "./App.css";

import { useState } from "react";
import Layout from "./pages/Layout/Layout";
import EventDash from "./pages/EventDash/EventDash";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Attend from "./pages/Attend/Attend";
import ImageGallery from "./pages/ImageGallery/ImageGallery";

import AuthContext from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);



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
              <Route index element={<Home />} />

              <Route path="/" element={<Layout />}>
                <Route path="About" element={<About />} />
                <Route path="Attend" element={<Attend />} />
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
