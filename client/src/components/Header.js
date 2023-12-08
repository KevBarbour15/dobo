import React, { useState, useEffect } from 'react';
import '../styles/header.css';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const scrollDistance = 60;
      setIsScrolled(offset > scrollDistance);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header-container ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-links">
        <nav>
          <a href="#about">About</a>
          <a className="header-title" href="#home">DOBO</a>
          <a href="#attend">Attend</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
