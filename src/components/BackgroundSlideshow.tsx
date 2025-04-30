
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  // Fix for TypeScript error by using a safer check for iOS devices
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 1500); // Durée de la transition augmentée pour plus de fluidité
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval, nextImageIndex]);

  return (
    <div className="absolute inset-0 left-0 w-1/2 overflow-hidden">
      {/* Image actuelle */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1500 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{ 
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: isIOS ? "brightness(1.25) contrast(1.1)" : "none"
        }}
      />
      
      {/* Image suivante (visible pendant la transition) */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1500 ease-in-out ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
        style={{ 
          backgroundImage: `url(${images[nextImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: isIOS ? "brightness(1.25) contrast(1.1)" : "none"
        }}
      />
      
      {/* Overlay pour assurer la lisibilité du texte - réduit sur mobile et iOS */}
      <div 
        className={`absolute inset-0 bg-black ${
          isIOS ? "bg-opacity-15" : (isMobile ? "bg-opacity-20" : "bg-opacity-30")
        }`}
      ></div>
    </div>
  );
};

export default BackgroundSlideshow;
