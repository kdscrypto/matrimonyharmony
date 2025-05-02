
import { useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { useLocation } from "react-router-dom";
import { useAudioStore } from "@/hooks/use-audio";

interface AudioPlayerProps {
  audioSrc: string;
}

const AudioPlayer = ({ audioSrc }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();
  
  const { isPlaying, hasInteracted, volume, togglePlaying, setVolume } = useAudioStore();

  // Effet pour gérer la lecture/pause en fonction de l'état isPlaying
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying && hasInteracted) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(err => {
        console.error("Erreur lors de la lecture audio:", err);
        useAudioStore.getState().setPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, hasInteracted, volume]);

  // Réinitialiser la lecture lors des changements de page
  useEffect(() => {
    if (!audioRef.current || !isPlaying || !hasInteracted) return;
    
    // Petit délai pour permettre la transition de page
    const timer = setTimeout(() => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname, isPlaying, hasInteracted]);
  
  // Gestion du changement de volume
  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      const newVolume = value[0];
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        loop 
        preload="auto"
      />
      
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 p-2 rounded-full shadow-md">
        {isPlaying && (
          <div className="w-20 mr-2">
            <Slider
              value={[volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="mr-2"
            />
          </div>
        )}
        
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white dark:bg-gray-800 hover:bg-opacity-100"
          onClick={togglePlaying}
          aria-label={isPlaying ? "Couper le son" : "Lancer la musique"}
        >
          {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </Button>
      </div>
    </>
  );
};

export default AudioPlayer;
