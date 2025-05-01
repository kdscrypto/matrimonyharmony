
import { NavLink } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Heart, Facebook, Youtube, Twitter, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            <div className="flex items-center justify-center md:justify-start mt-2 space-x-1">
              <a 
                href="https://www.youtube.com/@marcellestephane"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez-nous sur YouTube"
              >
                <Button variant="ghost" size="icon" className="text-white hover:text-wedding-orange">
                  <Youtube size={18} />
                </Button>
              </a>
              <a 
                href="https://twitter.com/marcellesteph"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez-nous sur X (Twitter)"
              >
                <Button variant="ghost" size="icon" className="text-white hover:text-wedding-orange">
                  <Twitter size={18} />
                </Button>
              </a>
              <a 
                href="https://wa.me/33612345678"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactez-nous sur WhatsApp"
              >
                <Button variant="ghost" size="icon" className="text-white hover:text-wedding-orange">
                  <MessageCircle size={18} />
                </Button>
              </a>
              <a 
                href="https://www.facebook.com/share/1BeiRnTvV7/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez-nous sur Facebook"
              >
                <Button variant="ghost" size="icon" className="text-white hover:text-wedding-orange">
                  <Facebook size={18} />
                </Button>
              </a>
            </div>
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

        <div className="mt-2 pt-4 border-t border-gray-700 text-center">
          <p className="text-xs md:text-sm text-gray-400">
            &copy; {currentYear} | Marcelle & Stéphane
          </p>
          <p className="text-xs md:text-sm mt-2 font-bold">
            Built with <Heart className="inline-block text-red-500 mx-1" size={14} fill="currentColor" /> By KDS
          </p>
          <div className="mt-2 flex items-center justify-center">
            <NavLink 
              to="/admin" 
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-wedding-orange transition-colors"
              title="Administration"
            >
              <Shield size={12} /> Admin
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
