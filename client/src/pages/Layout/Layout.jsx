import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./layout.scss";

// component imports
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AnimationOverlay from "../../components/AnimationOverlay/AnimationOverlay";

const Layout = () => {
  return (
    <div className="layout">
      <AnimationOverlay />
      <Header />
      <div className="main-page-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
