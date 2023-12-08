import Header from '../components/Header';
import Home from '../sections/Home';
import About from '../sections/About';
import Attend from '../sections/Attend';

function MainPage() {
  return (
    <div>
      <Header />
      <Home />
      <About />
      <Attend />
      {/* More sections as needed */}
    </div>
  );
}

export default MainPage;
