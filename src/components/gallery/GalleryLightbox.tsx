
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { LightboxProps } from "./types";

const GalleryLightbox: React.FC<LightboxProps> = ({
  images,
  selectedImage,
  selectedIndex,
  onClose,
  onNext,
  onPrevious
}) => {
  const isMobile = useIsMobile();
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onPrevious();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrevious]);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrevious();
    }
  };

  if (!selectedImage) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black ${isMobile ? "bg-opacity-65" : "bg-opacity-90"} z-50 flex flex-col items-center justify-center p-2 sm:p-4`}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="max-w-4xl w-full max-h-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-2 right-2 md:top-4 md:right-4 text-white text-2xl z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black bg-opacity-40 flex items-center justify-center"
          onClick={onClose}
          aria-label="Fermer"
        >
          <X size={isMobile ? 18 : 24} />
        </button>
        
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black bg-opacity-40 flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          aria-label="Image précédente"
        >
          <ChevronLeft size={isMobile ? 18 : 24} />
        </button>
        
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black bg-opacity-40 flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Image suivante"
        >
          <ChevronRight size={isMobile ? 18 : 24} />
        </button>
        
        <img 
          src={selectedImage.src} 
          alt={selectedImage.alt} 
          className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain mx-auto"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.error(`Failed to load lightbox image: ${target.src}`);
            target.onerror = null;
            target.src = 'placeholder.svg';
          }}
        />
        <div className="bg-black bg-opacity-60 p-2 md:p-4 text-white text-center">
          <p>{selectedImage.caption}</p>
        </div>
      </div>
      
      <div className="mt-4 text-white text-center">
        <p className="mb-2">{selectedIndex + 1} / {images.length}</p>
        {isMobile && (
          <div className="flex justify-center">
            <div className="flex space-x-1">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full ${idx === selectedIndex ? 'bg-wedding-gold' : 'bg-gray-500'}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryLightbox;
