import "./home.scss";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";

import axios from "../../axiosConfig.jsx";
import { filterAccessibleEventsNYC } from "../../util/timeZoneFormatting.jsx";

import {
  convertDateReadability,
  convertMilitaryTime,
} from "../../util/formatting.jsx";

// component imports
import Header from "../../components/Header/Header.jsx";
import homeVideo from "../../assets/images/home-video.mp4";
import homeImage from "../../assets/images/home.jpg";
import Footer from "../../components/Footer/Footer.jsx";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

// Register the SplitText plugin
gsap.registerPlugin(SplitText);

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [homeMedia, setHomeMedia] = useState(null);
  const [mediaReady, setMediaReady] = useState(false);
  const [futureEvents, setFutureEvents] = useState([]);
  const [eventsLoaded, setEventsLoaded] = useState(false);
  const containerRef = useRef(null);
  const homeImageRef = useRef(null);
  const homeVideoRef = useRef(null);
  const timelineRef = useRef(null);
  const splitTextRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events/get-all");
        let events = response.data;

        // filter events to only show future events that are set to public
        const filterPublicEvents = true;
        const futureEvents = filterAccessibleEventsNYC(
          events,
          filterPublicEvents
        );

        setFutureEvents(futureEvents);
        setEventsLoaded(true);
      } catch (error) {
        const errorData = error.response ? error.response.data : error.message;
        console.error("There was an error fetching the data:", errorData);
      }
    };
    fetchEvents();
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !mediaReady || !eventsLoaded) return;

    // Clear any existing timeline and SplitText
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    if (splitTextRef.current) {
      splitTextRef.current.revert();
    }

    const textContainer = document.querySelector(".home-text-container");
    const textHeight = textContainer.scrollHeight;

    // Create SplitText instance and store reference
    splitTextRef.current = new SplitText(".home-text", {
      type: ["chars", "words"],
      charsClass: "char",
      wordsClass: "word",
    });

    // Store timeline reference
    timelineRef.current = gsap.timeline({
      delay: 0.25,
    });

    // Create the animation sequence
    timelineRef.current
      .set(splitTextRef.current.words, {
        opacity: 0,
      })
      .to(
        ".home-media-container",
        {
          minHeight: "0",
          duration: 0.5,
        },
        0
      )
      .to(
        ".home-logo-container img",
        {
          opacity: 1,
          duration: 0.5,
        },
        "<"
      )
      .to(
        ".home-text-container",
        {
          height: textHeight,
          duration: 0.5,
          maxHeight: "100%",
        },
        "<"
      )
      .to(
        ".home-media-container",
        {
          height: `calc(100svh - ${textHeight}px)`,
          duration: 0.5,
          ease: "sine.out",
        },
        "<"
      )
      .to(".wrapper-line-top, .wrapper-line-bottom", {
        width: () => (isMobile ? "50%" : "300px"),
        duration: 0.5,
      })
      .to(
        splitTextRef.current.words,
        {
          duration: 1,
          stagger: { amount: 0.15, from: "random" },
          opacity: 1,
          ease: "sine.out",
        },
        "<"
      )
      .to(
        ".home-event-container",
        {
          opacity: 1,
          duration: 0.25,
        },
        0.75
      )
      .to(
        ".home-button-wrapper",
        {
          opacity: 1,
          duration: 0.25,
        },
        1
      );

    // Play immediately since we're already checking conditions at the start
    timelineRef.current.play();

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
    };
  }, [mediaReady, eventsLoaded]);

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
    <div>
      <Header />
      <div className="home-container" ref={containerRef}>
        <div className="home-media-container">
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
          <div className="home-logo-container">
            <img src={logo} alt="DOBO NYC - Modern Filipino Food" />

            <div className="home-event-container">
              {futureEvents.length > 0 ? (
                <>
                  <h2 className="home-event-title">Upcoming Events:</h2>
                  <div className="home-event-list">
                    {futureEvents.map((event, index) => (
                      <div key={`event-${index}`} className="home-event-item">
                        <h3>
                          {convertDateReadability(event.date)} at{" "}
                          {convertMilitaryTime(event.time)}
                          {event.seatsRemaining === 0 ? " - SOLD OUT" : ""}
                        </h3>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <h2 className="home-event-no-events">
                  Stay tuned for upcoming events!
                </h2>
              )}
            </div>
            {futureEvents.length > 0 && (
              <div className="home-button-wrapper">
                <Link to="/attend">
                  <button
                    className="home-button"
                    aria-label="Navigate to the Attend page"
                  >
                    BOOK NOW
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="home-text-container">
          <div className="container">
            <div className="home-text-wrapper">
              <div className="wrapper-line-top" />
              <h2 className="home-text">
                A unique Filipino dining experience, featuring time-honored
                recipes elevated to new heights.
              </h2>
              <div className="wrapper-line-bottom" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
