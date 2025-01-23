import { Outlet } from "react-router-dom";
import "./layout.scss";

// component imports
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Layout = () => {
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
