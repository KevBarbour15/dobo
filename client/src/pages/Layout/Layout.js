import { Outlet } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./layout.css";

const Layout = ({ children }) => {
  return (
    <div className="main-page-container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
