
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-wedding-burgundy text-white py-12">
      <div className="wedding-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-playfair mb-2">Marcelle & Stéphane</h2>
            <p className="text-wedding-orange">Nous avons hâte de vous voir !</p>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
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
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} | Marcelle & Stéphane
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
