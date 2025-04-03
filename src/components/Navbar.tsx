
import { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Optimiser la détection de défilement avec throttling
  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    // Throttle function pour améliorer les performances
    let lastScrollTime = 0;
    const throttleTime = 100; // ms
    
    const throttledScrollHandler = () => {
      const now = Date.now();
      if (now - lastScrollTime >= throttleTime) {
        lastScrollTime = now;
        handleScroll();
      }
    };

    window.addEventListener("scroll", throttledScrollHandler);
    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [handleScroll]);

  // Fermer le menu mobile lors d'un changement de route
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Empêcher le défilement du corps lorsque le menu mobile est ouvert
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-wedding-burgundy shadow-md py-2" 
          : "bg-gradient-to-b from-black/60 to-transparent py-3 md:py-5"
      }`}
    >
      <div className="wedding-container flex justify-between items-center">
        <NavLink 
          to="/" 
          className="text-white text-xl md:text-2xl font-playfair drop-shadow-md" 
          onClick={closeMobileMenu}
        >
          Marcelle & Stéphane
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/about" className="nav-link font-medium drop-shadow-md">
            Notre Histoire
          </NavLink>
          <NavLink to="/details" className="nav-link font-medium drop-shadow-md">
            Informations
          </NavLink>
          <NavLink to="/gallery" className="nav-link font-medium drop-shadow-md">
            Galerie
          </NavLink>
          <NavLink to="/rsvp" className="nav-link font-medium drop-shadow-md">
            RSVP
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-wedding-orange rounded-md shadow-md"
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation - Plein écran pour une meilleure expérience */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-wedding-burgundy pt-20">
          <nav className="wedding-container flex flex-col space-y-6 p-6">
            <NavLink
              to="/about"
              className="nav-link text-xl block py-3 text-center font-medium text-white"
              onClick={closeMobileMenu}
            >
              Notre Histoire
            </NavLink>
            <NavLink
              to="/details"
              className="nav-link text-xl block py-3 text-center font-medium text-white"
              onClick={closeMobileMenu}
            >
              Informations
            </NavLink>
            <NavLink
              to="/gallery"
              className="nav-link text-xl block py-3 text-center font-medium text-white"
              onClick={closeMobileMenu}
            >
              Galerie
            </NavLink>
            <NavLink
              to="/rsvp"
              className="nav-link text-xl block py-3 text-center font-medium text-white"
              onClick={closeMobileMenu}
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
