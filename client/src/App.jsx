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
    const setVH = () => {
      // Get the viewport height and multiply it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01;
      // Set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Set the value initially
    setVH();

    // Add event listener with a debounced resize handler
    let timeoutId;
    const handleResize = () => {
      // Clear the timeout if it exists
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Set a new timeout
      timeoutId = setTimeout(() => {
        // Only update if the width changed (not just height)
        // This prevents updates when mobile browsers show/hide their nav bars
        if (window.innerWidth !== window.lastWidth) {
          window.lastWidth = window.innerWidth;
          setVH();
        }
      }, 250); // 250ms delay
    };

    window.lastWidth = window.innerWidth;
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
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
