
import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/use-theme";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  type: "heart" | "ring" | "petal" | "star";
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajuster la taille du canvas pour qu'il prenne toute la place disponible
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    
    resize();
    window.addEventListener("resize", resize);

    // Créer les particules
    const particles: Particle[] = [];
    const particleCount = Math.min(window.innerWidth / 10, 50); // Limiter le nombre de particules selon la taille de l'écran
    
    const particleTypes: Array<"heart" | "ring" | "petal" | "star"> = ["heart", "ring", "petal", "star"];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 15 + 5,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
        opacity: Math.random() * 0.5 + 0.2, // Opacité entre 0.2 et 0.7
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.02) - 0.01
      });
    }

    // Dessiner une particule selon son type
    const drawParticle = (particle: Particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      
      const isLightTheme = theme === "light";
      
      if (isLightTheme) {
        ctx.fillStyle = `rgba(112, 31, 31, ${particle.opacity})`; // wedding-burgundy
      } else {
        ctx.fillStyle = `rgba(217, 199, 167, ${particle.opacity})`; // wedding-gold
      }
      
      ctx.beginPath();
      
      switch (particle.type) {
        case "heart":
          // Dessiner un coeur
          const size = particle.size;
          ctx.moveTo(0, size / 4);
          ctx.bezierCurveTo(size / 2, -size / 2, size, size / 4, 0, size);
          ctx.bezierCurveTo(-size, size / 4, -size / 2, -size / 2, 0, size / 4);
          break;
          
        case "ring":
          // Dessiner un anneau (cercle avec contour)
          ctx.lineWidth = particle.size / 5;
          if (isLightTheme) {
            ctx.strokeStyle = `rgba(112, 31, 31, ${particle.opacity})`; // wedding-burgundy
          } else {
            ctx.strokeStyle = `rgba(217, 199, 167, ${particle.opacity})`; // wedding-gold
          }
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
          ctx.stroke();
          return; // Sortir car pas de remplissage pour l'anneau
          
        case "petal":
          // Dessiner un pétale (forme ovale)
          ctx.scale(1, 2);
          ctx.arc(0, 0, particle.size / 3, 0, Math.PI * 2);
          break;
          
        case "star":
          // Dessiner une étoile
          const spikes = 5;
          const outerRadius = particle.size / 2;
          const innerRadius = particle.size / 4;
          
          for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI * 2 * i) / (spikes * 2);
            const x = radius * Math.sin(angle);
            const y = radius * Math.cos(angle);
            
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          break;
      }
      
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Mettre à jour et dessiner chaque particule
      particles.forEach((particle) => {
        // Mise à jour de la position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;
        
        // Rebond sur les bords
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
        
        // Dessiner la particule
        drawParticle(particle);
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Nettoyage
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default ParticlesBackground;
