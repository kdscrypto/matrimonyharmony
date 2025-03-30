
import { useState, useEffect } from "react";

interface BackgroundSlideshowProps {
  images: string[];
  interval?: number;
}

const BackgroundSlideshow = ({ 
  images, 
  interval = 5000 
}: BackgroundSlideshowProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 1000); // Durée de la transition
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval, nextImageIndex]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Image actuelle */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{ 
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      {/* Image suivante (visible pendant la transition) */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
        style={{ 
          backgroundImage: `url(${images[nextImageIndex]})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      {/* Overlay pour assurer la lisibilité du texte */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    </div>
  );
};

export default BackgroundSlideshow;
