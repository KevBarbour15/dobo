import { Outlet } from "react-router-dom";
import "./layout.css";

// component imports
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AnimationOverlay from "../../components/AnimationOverlay/AnimationOverlay";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <AnimationOverlay />
      <div className="main-page-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
