import "./home.scss";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// component imports
import Header from "../../components/Header/Header.jsx";
import logo from "../../assets/images/logo.png";
import homeVideo from "../../assets/images/home-video.mov";
import homeImage from "../../assets/images/home-portrait.jpg";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [homeMedia, setHomeMedia] = useState(null);
  const containerRef = useRef(null);
  const homeImageRef = useRef(null);
  const homeVideoRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current || !homeMedia) {
      return;
    }

    let tl = gsap.timeline({});

    tl.set(homeMedia, {
      opacity: 0,
    })
      .set(".home-logo img", {
        opacity: 0,
      })
      .set(".home-text", {
        opacity: 0,
      })
      .set(".home-text-container", {
        opacity: 1,
      })
      .to(".home-logo img", {
        delay: 0.25,
        opacity: 1,
        duration: 1,
      })
      .to(
        homeMedia,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.3,
          opacity: 1,
        },
        0.5
      )
      .to(
        ".home-text",
        {
          opacity: 1,
          duration: 0.25,
          ease: "power1.out",
        },
        1
      )
      .to(".home-button", {
        opacity: 1,
        duration: 0.25,
      });
  }, [isMobile, homeMedia]);

  useEffect(() => {
    if (isMobile) {
      setHomeMedia(homeImageRef.current);
    } else {
      setHomeMedia(homeVideoRef.current);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="home-container" ref={containerRef}>
        {isMobile ? (
          <img
            ref={homeImageRef}
            src={homeImage}
            alt="DOBO NYC"
            className="home-image"
          />
        ) : (
          <video
            ref={homeVideoRef}
            src={homeVideo}
            autoPlay
            loop
            muted
            playsInline
            className="home-video"
          />
        )}
        <div className="container">
          <div className="home-text-container">
            <div className="home-logo">
              <img src={logo} alt="DOBO NYC" />
            </div>
            <p className="home-text">
              A unique Filipino dining experience, featuring time-honored
              recipes elevated to new heights.
            </p>
            <div className="button-wrapper">
              <Link to="/attend">
                <button className="home-button">Join us</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
