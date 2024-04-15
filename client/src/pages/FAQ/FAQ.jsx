import "./FAQ.css";
import { useEffect, useState } from "react";

// image imports
import { randomImageArray3 } from "../../assets/images/imageArray.js";

// component imports
import PageTitle from "../../components/PageTitle/PageTitle.jsx";

// animation imports
import useFadeIn from "../../animation-hooks/fadeIn.js";
import useSplitText from "../../animation-hooks/splitText.js";
import { SplitText } from "gsap/SplitText";

const FAQ = () => {
  const [image, setImage] = useState("");

  const split1 = new SplitText(".paragraph-1", {
    type: "chars,words,lines",
    position: "absolute",
  });

  const split2 = new SplitText(".paragraph-2", {
    type: "chars,words,lines",
    position: "absolute",
  });

  const split3 = new SplitText(".paragraph-3", {
    type: "chars,words,lines",
    position: "absolute",
  });

  // animate images and content
  useFadeIn(true, ".faq-container", 0.5, 0.25, 0);
  useFadeIn(true, ".image-container", 0.5, 0.25, 0);
  useFadeIn(true, ".faq-info-container", 0.5, 0.25, 25);
  useSplitText(split1, 0.5);
  useSplitText(split2, 1);
  useSplitText(split3, 1.5);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * randomImageArray3.length);
    setImage(randomImageArray3[randomIndex]);
  }, []);

  return (
    <div id="faq" className="faq-container">
      <div className="page-left">
        <div className="image-container">
          <img src={image} alt="dobo" />
        </div>
      </div>
      <div className="page-right">
        <PageTitle title={"faq"} />
        <div className="faq-info-container">
          <ul>
            <li>Where is the dinner located?</li>
            <p>
              The dinner will take place in Downtown Brooklyn. We will share the
              exact location with you closer to the event date.
            </p>
            <li>How many people will be in attendance?</li>
            <p>
              Our dinner is an intimate gathering, similar to an omakase
              experience, with about 8 guests.
            </p>
            <li>How many courses are served?</li>
            <p>
              The meal consists of 8 Filipino-American inspired courses, each
              paired with wine.
            </p>
            <li>What can I expect on the menu?</li>
            <p>
              Our menu features items such as scallops, shellfish, grass-fed
              beef, pasture-raised chicken, coconut, white rice, and peanuts.
              There’s a single course that includes pork.
            </p>
            <p>Please let me know if you have any food allergies.</p>
            <li>What if I have dietary restrictions?</li>
            <p>
              We're happy to accommodate most allergies and no-pork preferences.
              Please note, our menu primarily features beef, chicken, and
              seafood, which makes vegan or vegetarian options challenging.
            </p>
            <li>What is the cost of the dinner?</li>
            <p>
              The dinner costs $150 per person. If you’d like to enjoy wine
              pairing with your meal, it’s an additional $20.
            </p>
            <li>Does the cost include a tip?</li>
            <p>Yes, the ticket price includes the tip.</p>
            <li>Can I bring my own wine?</li>
            <p>We have plenty of wine planned for the evening.</p>
            <li>How can I reserve a seat?</li>
            <p>
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
