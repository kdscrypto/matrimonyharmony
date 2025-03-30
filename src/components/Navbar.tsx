
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-wedding-dark bg-opacity-90 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="wedding-container flex justify-between items-center">
        <NavLink to="/" className="text-white text-xl md:text-2xl font-playfair">
          Marcelle & Stéphane
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/about" className="nav-link">
            Notre Histoire
          </NavLink>
          <NavLink to="/details" className="nav-link">
            Informations
          </NavLink>
          <NavLink to="/gallery" className="nav-link">
            Galerie
          </NavLink>
          <NavLink to="/rsvp" className="nav-link">
            RSVP
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-wedding-dark bg-opacity-95 py-4">
          <nav className="wedding-container flex flex-col space-y-4">
            <NavLink
              to="/about"
              className="nav-link block py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Notre Histoire
            </NavLink>
            <NavLink
              to="/details"
              className="nav-link block py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Informations
            </NavLink>
            <NavLink
              to="/gallery"
              className="nav-link block py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Galerie
            </NavLink>
            <NavLink
              to="/rsvp"
              className="nav-link block py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              RSVP
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
