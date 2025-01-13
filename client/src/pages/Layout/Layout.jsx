import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./layout.scss";

// component imports
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Layout = () => {
  const setVHVariable = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    setVHVariable();
  }, []);

  return (
    <div className="layout">
      <Header />
      <div className="main-page-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
