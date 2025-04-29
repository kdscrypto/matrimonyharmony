
import React from "react";
import { GalleryImage } from "./types";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage, index: number) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
      {images.map((image, index) => (
        <div 
          key={index} 
          className="group relative overflow-hidden rounded-lg shadow-md aspect-square cursor-pointer"
          onClick={() => onImageClick(image, index)}
        >
          <img 
            src={image.src} 
            alt={image.alt} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              console.error(`Failed to load image: ${target.src}`);
              target.onerror = null;
              target.src = 'placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end justify-center">
            <div className="p-2 sm:p-4 w-full bg-black bg-opacity-0 group-hover:bg-opacity-50 translate-y-full group-hover:translate-y-0 transition-all duration-300">
              <p className="text-white text-center text-xs sm:text-sm">{image.caption}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
