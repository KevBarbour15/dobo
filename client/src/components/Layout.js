import React from "react";

import SlidingMenu from "./SlidingMenu";
import "../styles/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="header">
        <header>
          <SlidingMenu />
        </header>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
