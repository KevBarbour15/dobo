import "./App.scss";
import "./parallax.scss";

// page imports
import Layout from "./pages/Layout/Layout";
import EventDash from "./pages/EventDash/EventDash";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import FAQ from "./pages/FAQ/FAQ";
import Attend from "./pages/Attend/Attend";
import ImageGallery from "./pages/ImageGallery/ImageGallery";
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
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <ToastContainer />
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
      </Router>
    </AuthProvider>
  );
}

export default App;
