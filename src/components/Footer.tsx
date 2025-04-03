
import { NavLink } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Heart } from "lucide-react";

const Footer = () => {
  const isMobile = useIsMobile();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wedding-burgundy text-white py-10 md:py-12">
      <div className="wedding-container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-playfair mb-2">Marcelle & Stéphane</h2>
            <p className="text-wedding-orange text-sm md:text-base">Nous avons hâte de vous voir !</p>
          </div>

          <div className="grid grid-cols-2 md:flex md:flex-row gap-x-8 gap-y-4 md:gap-y-0 md:space-x-8 text-center md:text-left">
            <NavLink to="/about" className="nav-link text-sm md:text-base">
              Notre Histoire
            </NavLink>
            <NavLink to="/details" className="nav-link text-sm md:text-base">
              Informations
            </NavLink>
            <NavLink to="/gallery" className="nav-link text-sm md:text-base">
              Galerie
            </NavLink>
            <NavLink to="/rsvp" className="nav-link text-sm md:text-base">
              RSVP
            </NavLink>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-xs md:text-sm text-gray-400">
            &copy; {currentYear} | Marcelle & Stéphane
          </p>
          <p className="text-xs md:text-sm mt-2 font-bold">
            Built with <Heart className="inline-block text-red-500 mx-1" size={14} fill="currentColor" /> By KDS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
