import { useState, useEffect } from "react";

import { SITE_CONFIG } from "@/config/siteConfig";

import { TimeLeft } from "./types";

const DEFAULT_TIME: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

const calculateTimeLeft = (): TimeLeft => {
  const difference = SITE_CONFIG.wedding.date.getTime() - new Date().getTime();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(DEFAULT_TIME);
  const isMounted = typeof window !== "undefined";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/80 backdrop-blur-sm shadow-soft flex items-center justify-center border border-secondary/20">
              <span className="text-2xl md:text-3xl font-serif font-semibold text-primary">
                --
              </span>
            </div>
          </div>
          <span className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
            dias
          </span>
        </div>
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: "dias" },
    { value: timeLeft.hours, label: "horas" },
    { value: timeLeft.minutes, label: "min" },
    { value: timeLeft.seconds, label: "seg" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {timeUnits.map((unit, index) => (
        <div className="flex flex-col items-center" key={unit.label}>
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/80 backdrop-blur-sm shadow-soft flex items-center justify-center border border-secondary/20">
              <span className="text-2xl md:text-3xl font-serif font-semibold text-primary">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            {index < timeUnits.length - 1 && (
              <span className="absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2 text-secondary text-lg font-light hidden sm:block">
                :
              </span>
            )}
          </div>
          <span className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};
