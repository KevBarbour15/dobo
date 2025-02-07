import "./home.scss";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// component imports
import Header from "../../components/Header/Header.jsx";
import logo from "../../assets/images/logo.png";
import homeVideo from "../../assets/images/home-video.mp4";
import homeImage from "../../assets/images/home-portrait.jpg";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [homeMedia, setHomeMedia] = useState(null);
  const [mediaReady, setMediaReady] = useState(false);
  const containerRef = useRef(null);
  const homeImageRef = useRef(null);
  const homeVideoRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current || !homeMedia) {
      return;
    }

    let tl = gsap.timeline({});

    // Set initial states
    tl.set(homeMedia, {
      opacity: 0,
      scale: 0.95, // Add a slight scale effect
    })
      .set(".home-logo img", {
        opacity: 0,
      })
      .set(".home-text", {
        opacity: 0,
      })
      .set(".home-button-wrapper", {
        opacity: 0,
      })
      .set(".home-text-container", {
        opacity: 1,
      });

    // Create the animation sequence
    const mainAnimation = gsap.timeline({
      paused: true, // Start paused
    });

    mainAnimation
      .to(
        ".home-logo img",
        {
          delay: 0.25,
          opacity: 1,
          duration: 1,
          scale: 1,
        },
        0
      )
      .to(
        ".home-text",
        {
          opacity: 1,
          duration: 1,
        },
        0.5
      )
      .to(
        ".home-button-wrapper",
        {
          opacity: 1,
          duration: 1,
        },
        0.5
      )
      .to(
        homeMedia,
        {
          duration: 0.5,
          opacity: 1,
          scale: 1,
        },
        0.25
      );

    // Only play the animation when media is ready
    if (mediaReady) {
      mainAnimation.play();
    }
  }, [isMobile, homeMedia, mediaReady]);

  const handleVideoReady = () => {
    setMediaReady(true);
  };

  const handleImageLoad = () => {
    setMediaReady(true);
  };

  useEffect(() => {
    setMediaReady(false);
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
  }, [isMobile]);

  return (
    <>
      <Header />
      <div className="home-container" ref={containerRef}>
        {isMobile ? (
          <img
            ref={homeImageRef}
            src={homeImage}
            alt="DOBO NYC - Modern Filipino Food"
            className="home-image"
            onLoad={handleImageLoad}
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
            alt="DOBO NYC - Modern Filipino Food"
            onLoadedData={handleVideoReady}
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
            <div className="home-button-wrapper">
              <Link to="/attend">
                <button
                  className="home-button"
                  aria-label="Navigate to the Attend page"
                >
                  Join us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
