
import { useState } from "react";

const Gallery = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b3ce551?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      alt: "Couple au bord de l'eau",
      caption: "Promenade au bord du lac"
    },
    {
      src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      alt: "Couple qui marche main dans la main",
      caption: "Vacances en Italie"
    },
    {
      src: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80",
      alt: "Mains avec bagues de fiançailles",
      caption: "Notre fiançailles"
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80",
      alt: "Couple en train de danser",
      caption: "Soirée dansante entre amis"
    },
    {
      src: "https://images.unsplash.com/photo-1545232979-8bf3f9f7fbff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      alt: "Couple dans la neige",
      caption: "Escapade hivernale"
    },
    {
      src: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      alt: "Couple devant un coucher de soleil",
      caption: "Coucher de soleil au Portugal"
    },
    {
      src: "https://images.unsplash.com/photo-1529519195486-16945f0fb37f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      alt: "Couple dans un café",
      caption: "Notre café préféré"
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

  return (
    <div className="pt-24 pb-16">
      <div className="wedding-container">
        <h1 className="section-title mb-12">Notre Galerie</h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg shadow-md aspect-square cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end justify-center">
                  <div className="p-4 w-full bg-black bg-opacity-0 group-hover:bg-opacity-50 translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-white text-center">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="max-w-4xl max-h-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-white text-2xl z-10 w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center"
                onClick={() => setSelectedImage(null)}
              >
                &times;
              </button>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="bg-black bg-opacity-70 p-4 text-white text-center">
                <p>{selectedImage.caption}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
