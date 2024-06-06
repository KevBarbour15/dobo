import "./FAQ.scss";
import { useEffect, useState } from "react";

// component imports
import PageTitle from "../../components/PageTitle/PageTitle.jsx";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

//
import useParallax from "../../animation-hooks/parallax.js";
import useFadeIn from "../../animation-hooks/fadeIn.js";

const FAQ = () => {
  // custom parallax hook
  // custom fade and parallax hooks
  useFadeIn(true, ".page-container", 1.25, 0);
  useParallax();

  useGSAP(() => {
    let tl = gsap.timeline({ ease: "sine.out" });
    tl.from(
      ".list-item",
      {
        x: function (i) {
          if (i % 2 === 0) {
            return -100;
          }
          return 100;
        },
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".faq-info-container",
          start: "top 70%",
          end: "top +=300",
          scrub: 5,
        },
      },
      0
    );
  });

  return (
    <div className="page-container">
      <div className="parallax">
        <div className="faq-layer image-layer"></div>
        <div className="page-title">FAQ</div>
      </div>

      <div className="page-bottom">
        <PageTitle title={"FAQ"} />
        <div className="faq-info-container">
          <ul>
            <li className="list-item">Where is the dinner located?</li>
            <p className="list-item">
              The dinner will take place in Downtown Brooklyn. We will share the
              exact location with you closer to the event date.
            </p>
            <li className="list-item">
              How many people will be in attendance?
            </li>
            <p className="list-item">
              Our dinner is an intimate gathering, similar to an omakase
              experience, with about 8 guests.
            </p>
            <li className="list-item">How many courses are served?</li>
            <p className="list-item">
              The meal consists of 8 Filipino-American inspired courses, each
              paired with wine.
            </p>
            <li className="list-item">What can I expect on the menu?</li>
            <p className="list-item">
              Our menu features items such as scallops, shellfish, grass-fed
              beef, pasture-raised chicken, coconut, white rice, and peanuts.
              There’s a single course that includes pork.
            </p>
            <p
              className="list-item"
              style={{ fontStyle: "italic", fontWeight: "bold" }}
            >
              * Please let me know if you have any food allergies.
            </p>
            <li className="list-item">What if I have dietary restrictions?</li>
            <p className="list-item">
              We're happy to accommodate most allergies and no-pork preferences.
              Please note, our menu primarily features beef, chicken, and
              seafood, which makes vegan or vegetarian options challenging.
            </p>
            <li className="list-item">What is the cost of the dinner?</li>
            <p className="list-item">
              The dinner costs $150 per person. If you’d like to enjoy wine
              pairing with your meal, it’s an additional $20.
            </p>
            <li className="list-item">Does the cost include a tip?</li>
            <p className="list-item">Yes, the ticket price includes the tip.</p>
            <li className="list-item">Can I bring my own wine?</li>
            <p className="list-item">
              We have plenty of wine planned for the evening.
            </p>
            <li className="list-item">How can I reserve a seat?</li>
            <p className="list-item">
              To secure your seat, we require a $75 deposit. This helps cover
              the cost of ingredients and ensures your reservation on a
              first-come, first-served basis.
            </p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
