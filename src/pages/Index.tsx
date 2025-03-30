
import { NavLink } from "react-router-dom";
import Countdown from "@/components/Countdown";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";

const Index = () => {
  // Images de fond pour le diaporama
  const backgroundImages = [
    "/lovable-uploads/e10c8701-5c9b-4181-92f7-5fdc4677d567.png",
    "/lovable-uploads/b5d4a20f-e0c2-40b5-8b6b-8e374048cf3e.png",
    "/lovable-uploads/6d5d959e-af8d-4650-911c-7de5412ac9e6.png",
    "/lovable-uploads/6017e0a1-2d08-44bf-bcf5-3e7b9a709f9a.png"
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="h-screen relative flex items-center">
        {/* Background Slideshow */}
        <BackgroundSlideshow images={backgroundImages} interval={12000} />

        {/* Content - repositionné à droite */}
        <div className="relative z-10 text-center text-wedding-burgundy p-6 ml-auto w-1/2">
          <h1 className="text-5xl md:text-7xl font-playfair mb-4 animate-fade-in">
            Marcelle & Stéphane
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 animate-fade-up">
            17 Mai 2025 • Yaoundé, Cameroun
          </p>
          <NavLink
            to="/rsvp"
            className="inline-block bg-wedding-terracotta hover:bg-wedding-orange text-white font-medium py-3 px-8 rounded-md transition-all duration-300 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            RSVP
          </NavLink>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-wedding-burgundy animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 bg-wedding-sage bg-opacity-20">
        <div className="wedding-container">
          <div className="max-w-3xl mx-auto">
            <Countdown />
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20">
        <div className="wedding-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title mb-6">Notre Mariage</h2>
            <p className="text-lg mb-10 leading-relaxed text-wedding-burgundy">
              Nous sommes ravis de vous inviter à célébrer notre union. Ce sera
              pour nous une immense joie de partager ce moment unique entourés
              de nos proches. Naviguez sur ce site pour découvrir tous les
              détails de notre grand jour.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <NavLink to="/about" className="btn-primary">
                Notre Histoire
              </NavLink>
              <NavLink to="/details" className="btn-outline">
                Informations Pratiques
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
