import "./App.scss";
import { useEffect } from "react";

// page imports
import Layout from "./pages/Layout/Layout";
import EventDash from "./pages/EventDash/EventDash";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import FAQ from "./pages/FAQ/FAQ";
import Attend from "./pages/Attend/Attend";
import ImageGallery from "./pages/ImageGallery/ImageGallery";
import Success from "./pages/Success/Success";

import ScrollToTop from "./components/ScrollToTop";

// toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// security
import AuthProvider from "./context/AuthProvider";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother);

function App() {
  useEffect(() => {
    // Prevent browser's default scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <ToastContainer />
        <div>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Layout />}>
              <Route path="about" element={<About />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="attend" element={<Attend />} />
              <Route path="gallery" element={<ImageGallery />} />
              <Route path="success" element={<Success />} />
            </Route>
            <Route path="/dashboard" element={<EventDash />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
