import Header from "../../components/Header/Header";
import Home from "../../sections/Home/Home";
import About from "../../sections/About/About";
import Attend from "../../sections/Attend/Attend";
import Contact from "../../sections/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import "./home-page.css";

const HomePage = () => {
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

export default HomePage;
