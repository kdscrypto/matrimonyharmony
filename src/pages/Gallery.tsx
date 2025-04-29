
import { useState, useCallback } from "react";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import { GalleryImage } from "@/components/gallery/types";
import { galleryImages } from "@/components/gallery/galleryData";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const openLightbox = useCallback((image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    setSelectedIndex(-1);
    document.body.style.overflow = '';
  }, []);

  const goToPrevious = useCallback(() => {
    const newIndex = (selectedIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[newIndex]);
    setSelectedIndex(newIndex);
  }, [selectedIndex]);

  const goToNext = useCallback(() => {
    const newIndex = (selectedIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[newIndex]);
    setSelectedIndex(newIndex);
  }, [selectedIndex]);

  return (
    <div className="pt-16 md:pt-24 pb-16">
      <div className="wedding-container px-2 sm:px-4">
        <h1 className="section-title mb-8 md:mb-12">Notre Galerie</h1>
        
        <div className="max-w-6xl mx-auto">
          <GalleryGrid 
            images={galleryImages} 
            onImageClick={openLightbox} 
          />
        </div>

        <GalleryLightbox
          images={galleryImages}
          selectedImage={selectedImage}
          selectedIndex={selectedIndex}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrevious={goToPrevious}
        />
      </div>
    </div>
  );
};

export default Gallery;
