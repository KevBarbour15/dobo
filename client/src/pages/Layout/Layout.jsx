import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./layout.scss";

// component imports
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AnimationOverlay from "../../components/AnimationOverlay/AnimationOverlay";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Layout = () => {
  useEffect(() => {
    /*
    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
    */
    /*
    function adjustViewportHeight() {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    }

    // Adjust viewport height on load and resize
    window.addEventListener("resize", adjustViewportHeight);
    window.addEventListener("load", adjustViewportHeight);

    // Call the function initially
    adjustViewportHeight();
    */
  }, []);

  useGSAP(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".image-layer",
        start: "+=250",
        end: "+=250",
        scrub: true,
        //markers: true,
      },
    });

    tl.to(
      ".header-container",
      {
        background: "#ebe2d9",
        border: "1px solid black",
        boxShadow: "0 1.25px 1.75px rgba(0, 0, 0, 0.35)",
      },
      0
    )
      .to(
        ".menu-button",
        {
          color: "black",
          textShadow: "0 1.25px 1.75px rgba(0, 0, 0, 0.35)",
        },
        0
      )
      .to(
        ".header-title-container",
        {
          y: 0,
          opacity: 1,
        },
        0
      );

    let arrowTl = gsap.timeline({ repeat: -1, repeatDelay: 0.25, yoyo: true });

    arrowTl.to(".material-symbols-outlined", {
      duration: 0.75,
      y: -15,
      opacity: 0,
      ease: "sine.outOut",
    });
  }, []);

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
