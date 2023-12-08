import { useState, useEffect } from "react";
import SlidingMenu from "./SlidingMenu";
import "../styles/layout.css";
import { convertDateReadability } from "../util/formatting";

const Layout = ({ children }) => {
  const [date, setDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const date = new Date();
    const formattedDate = convertDateReadability(date);
    setDate(formattedDate);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="layout-container">
      <div className="header">
        <header>
          <div className="header-left">
            <div className="header-location">
              <span>Brooklyn</span>
            </div>
          </div>
          <div className="header-center">
            <div className="header-title">
              <span>DOBO</span>
            </div>
          </div>
          <div className="header-right">
            <div className="menu-button">
              <span className="material-symbols-outlined" onClick={toggleMenu}>
                {isOpen ? "close" : "menu"}
              </span>
            </div>
          </div>

          <SlidingMenu isOpen={isOpen} toggleMenu={toggleMenu} />
        </header>
      </div>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
