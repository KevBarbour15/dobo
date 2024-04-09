import { Outlet } from "react-router-dom";
import "./layout.css";

// component imports
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Layout = () => {
  return (
    <div className="layout">
      <div className="main-page-container">
        <Header />
        <div className="main-page-content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
