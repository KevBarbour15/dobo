import { useState, useEffect } from "react";
import SlidingMenu from "./SlidingMenu";
import "../styles/layout.css";
import { convertDateReadability } from "../helpers/formatting";
import Menu from "../assets/menu.png";

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
            <div className="header-title">
              <span>DOBO</span>
            </div>
          </div>
          <div className="header-right">
            <div className="menu-button">
              {
                <button onClick={toggleMenu}>
                  <img src={Menu} alt="menu icon" className="menu-icon" />
                </button>
              }
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
