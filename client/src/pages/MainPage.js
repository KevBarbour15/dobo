import Header from "../components/Header";
import Home from "../sections/Home";
import About from "../sections/About";
import Attend from "../sections/Attend";
import Contact from "../sections/Contact";
import Footer from "../components/Footer";
import "../styles/main-page.css";

const MainPage = () => {

  return (
    <div className="main-page-container">
      <Header />
      <Home />
      <About />
      <Attend />
      <Contact />
      <Footer />
    </div>
  );
};

export default MainPage;
