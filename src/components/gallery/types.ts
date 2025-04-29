
export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface LightboxProps {
  images: GalleryImage[];
  selectedImage: GalleryImage | null;
  selectedIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}
