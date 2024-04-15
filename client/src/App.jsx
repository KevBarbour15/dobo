import "./App.css";

import { useState } from "react";
import Layout from "./pages/Layout/Layout";
import EventDash from "./pages/EventDash/EventDash";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import FAQ from "./pages/FAQ/FAQ";
import Attend from "./pages/Attend/Attend";
import ImageGallery from "./pages/ImageGallery/ImageGallery";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthContext from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <ToastContainer />
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
              <Route path="FAQ" element={<FAQ />} />
              <Route path="Attend" element={<Attend />} />
              <Route path="Gallery" element={<ImageGallery />} />
            </Route>
            <Route path="/EventDash" element={<EventDash />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
