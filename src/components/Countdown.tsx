
import { useState, useEffect } from "react";
import ParticlesBackground from "./ParticlesBackground";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ElapsedTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  // Date du mariage: 17 Mai 2025 à 15:00
  const weddingDate = new Date("2025-05-17T15:00:00");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [elapsedTime, setElapsedTime] = useState<ElapsedTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isWeddingDay, setIsWeddingDay] = useState(false);
  const [showFallingHearts, setShowFallingHearts] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +weddingDate - +new Date();
      
      if (difference > 0) {
        // Le mariage n'a pas encore eu lieu
        setIsWeddingDay(false);
        const timeLeftValues = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
        setTimeLeft(timeLeftValues);
        
        // Vérifier si nous sommes à 10 jours ou moins du mariage
        if (timeLeftValues.days <= 10) {
          setShowFallingHearts(true);
        }
      } else {
        // Le mariage a déjà eu lieu
        setIsWeddingDay(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        
        // Calculer le temps écoulé depuis le mariage
        const elapsed = +new Date() - +weddingDate;
        setElapsedTime({
          days: Math.floor(elapsed / (1000 * 60 * 60 * 24)),
          hours: Math.floor((elapsed / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((elapsed / 1000 / 60) % 60),
          seconds: Math.floor((elapsed / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white dark:bg-wedding-burgundy bg-opacity-80 dark:bg-opacity-90 rounded-lg p-4 w-20 md:w-24 h-20 md:h-24 flex items-center justify-center shadow-md">
        <span className="text-2xl md:text-3xl font-semibold text-wedding-burgundy dark:text-white">
          {value}
        </span>
      </div>
      <span className="mt-2 text-sm md:text-base font-medium text-white dark:text-wedding-gold">
        {label}
      </span>
    </div>
  );

  return (
    <div className="bg-wedding-burgundy bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-90 p-6 rounded-lg shadow-lg relative overflow-hidden">
      {/* Animation de particules en arrière-plan avec coeurs rouges si proche du mariage */}
      <ParticlesBackground showFallingHearts={showFallingHearts} />
      
      {/* Contenu du compte à rebours avec z-index pour être au-dessus des particules */}
      <div className="relative z-10">
        <h3 className="text-xl md:text-2xl font-playfair text-center text-white mb-6">
          {isWeddingDay 
            ? "Notre Mariage Dure Depuis" 
            : "Notre Grand Jour Arrive Dans"}
        </h3>
        <div className="flex justify-center space-x-4 md:space-x-8">
          {isWeddingDay ? (
            <>
              <TimeUnit value={elapsedTime.days} label="Jours" />
              <TimeUnit value={elapsedTime.hours} label="Heures" />
              <TimeUnit value={elapsedTime.minutes} label="Minutes" />
              <TimeUnit value={elapsedTime.seconds} label="Secondes" />
            </>
          ) : (
            <>
              <TimeUnit value={timeLeft.days} label="Jours" />
              <TimeUnit value={timeLeft.hours} label="Heures" />
              <TimeUnit value={timeLeft.minutes} label="Minutes" />
              <TimeUnit value={timeLeft.seconds} label="Secondes" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Countdown;
