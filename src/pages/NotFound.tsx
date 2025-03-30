
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-wedding-beige p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-playfair mb-6">404</h1>
        <p className="text-xl mb-8">
          Oups ! La page que vous recherchez semble s'être égarée...
        </p>
        <NavLink
          to="/"
          className="btn-primary inline-block"
        >
          Retour à l'accueil
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
