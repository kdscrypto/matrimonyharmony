
import { useState, useEffect } from "react";

interface TimeLeft {
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

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +weddingDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Le mariage a déjà eu lieu
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white bg-opacity-80 rounded-lg p-4 w-20 md:w-24 h-20 md:h-24 flex items-center justify-center shadow-md">
        <span className="text-2xl md:text-3xl font-semibold text-wedding-burgundy">
          {value}
        </span>
      </div>
      <span className="mt-2 text-sm md:text-base font-medium text-white">
        {label}
      </span>
    </div>
  );

  return (
    <div className="bg-wedding-burgundy bg-opacity-80 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl md:text-2xl font-playfair text-center text-white mb-6">
        Notre Grand Jour Arrive Dans
      </h3>
      <div className="flex justify-center space-x-4 md:space-x-8">
        <TimeUnit value={timeLeft.days} label="Jours" />
        <TimeUnit value={timeLeft.hours} label="Heures" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Secondes" />
      </div>
    </div>
  );
};

export default Countdown;
