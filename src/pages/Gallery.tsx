
import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Gallery = () => {
  const images = [
    {
      src: "public/lovable-uploads/e1df4d21-b7c9-455e-b640-53965aeb670a.png",
      alt: "Stéphane et Marcelle en tenue élégante dans l'église",
      caption: "Séance photo à l'église"
    },
    {
      src: "public/lovable-uploads/d47d91af-7987-4604-ac04-49300e83360b.png",
      alt: "Stéphane et Marcelle en tenue décontractée",
      caption: "Sortie en amoureux"
    },
    {
      src: "public/lovable-uploads/b7f3518c-76ef-4d7d-8ea9-1e80a71c0a15.png",
      alt: "Stéphane et Marcelle en tenue de cérémonie",
      caption: "Journée festive"
    },
    {
      src: "public/lovable-uploads/17a7f960-e901-4b11-9b90-2a207f4e42bb.png",
      alt: "Marcelle en tenue traditionnelle violette",
      caption: "Tradition et élégance"
    },
    {
      src: "public/lovable-uploads/bfb33aca-f9c9-4960-a24f-31e0f681ef8e.png",
      alt: "Stéphane et Marcelle regardant la télévision",
      caption: "Moment de complicité"
    },
    {
      src: "public/lovable-uploads/6cd07b9d-7090-49cb-a85b-be8bec29c42d.png",
      alt: "Stéphane, Marcelle et leurs enfants",
      caption: "Portrait de famille"
    },
    {
      src: "public/lovable-uploads/14494255-2458-4379-8b93-1f786dfbb373.png",
      alt: "Stéphane et Marcelle en selfie",
      caption: "Selfie complice"
    },
    {
      src: "public/lovable-uploads/d46a6f49-3582-4661-b2ea-379adfdfdafc.png",
      alt: "Stéphane en tenue décontractée",
      caption: "Stéphane stylé"
    },
    {
      src: "public/lovable-uploads/5d83fb40-cd26-4e14-ae5f-5ac46be54546.png",
      alt: "Stéphane à la plage",
      caption: "Escapade à la plage"
    },
    {
      src: "public/lovable-uploads/d1b41496-5f45-477a-ba4d-2e7b7da8bab8.png",
      alt: "Stéphane et Marcelle en tenue traditionnelle",
      caption: "Cérémonie traditionnelle"
    },
    {
      src: "public/lovable-uploads/0da2d2fd-521b-4c80-93fe-651c60aa7652.png",
      alt: "Stéphane et Marcelle échangeant leurs vœux",
      caption: "Échange des vœux"
    },
    {
      src: "https://images.unsplash.com/photo-1535615615570-3b839f4359be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
      alt: "Couple sous un parapluie",
      caption: "Balade sous la pluie"
    }
  ];

  const [selectedImage, setSelectedImage] = useState<null | {
    src: string;
    alt: string;
    caption: string;
  }>(null);

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const isMobile = useIsMobile();
  
  // Support for keyboard navigation and gestures
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedIndex]);
  
  // Touch event handling for swipe on mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
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
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const openLightbox = useCallback((image: typeof images[0], index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    setSelectedIndex(-1);
    // Restore body scrolling when lightbox is closed
    document.body.style.overflow = '';
  }, []);

  const goToPrevious = useCallback(() => {
    const newIndex = (selectedIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
    setSelectedIndex(newIndex);
  }, [selectedIndex, images]);

  const goToNext = useCallback(() => {
    const newIndex = (selectedIndex + 1) % images.length;
    setSelectedImage(images[newIndex]);
    setSelectedIndex(newIndex);
  }, [selectedIndex, images]);

  return (
    <div className="pt-16 md:pt-24 pb-16">
      <div className="wedding-container px-2 sm:px-4">
        <h1 className="section-title mb-8 md:mb-12">Notre Galerie</h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg shadow-md aspect-square cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end justify-center">
                  <div className="p-2 sm:p-4 w-full bg-black bg-opacity-0 group-hover:bg-opacity-50 translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-white text-center text-xs sm:text-sm">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-2 sm:p-4"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="max-w-4xl w-full max-h-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-2 right-2 md:top-4 md:right-4 text-white text-2xl z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center"
                onClick={closeLightbox}
                aria-label="Fermer"
              >
                <X size={isMobile ? 18 : 24} />
              </button>
              
              {/* Navigation buttons */}
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                aria-label="Image précédente"
              >
                <ChevronLeft size={isMobile ? 18 : 24} />
              </button>
              
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Image suivante"
              >
                <ChevronRight size={isMobile ? 18 : 24} />
              </button>
              
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain mx-auto"
              />
              <div className="bg-black bg-opacity-70 p-2 md:p-4 text-white text-center">
                <p>{selectedImage.caption}</p>
              </div>
            </div>
            
            {/* Mobile indicator and counter */}
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
        )}
      </div>
    </div>
  );
};

export default Gallery;
