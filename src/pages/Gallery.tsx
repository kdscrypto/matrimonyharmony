
import { useState } from "react";

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
