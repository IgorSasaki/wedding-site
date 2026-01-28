import { Heart } from "lucide-react";

import { ICON_MAP } from "./data";
import { TimelineItemProps } from "./types";

export const TimelineItem = ({ event, index, isLast }: TimelineItemProps) => {
  const Icon = ICON_MAP[event.icon] || Heart;
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
      {/* Linha conectora vertical */}
      {!isLast && (
        <div className="absolute left-6 md:left-1/2 top-14 md:top-16 w-0.5 h-[calc(100%-3rem)] bg-linear-to-b from-secondary/50 to-secondary/20 md:-translate-x-1/2" />
      )}

      {/* Conteúdo à esquerda (desktop) */}
      <div
        className={`hidden md:block flex-1 ${isEven ? "text-right pr-8" : "opacity-0"}`}
      >
        {isEven && (
          <div className="inline-block">
            {event.date && (
              <span className="text-sm text-secondary font-medium block mb-1">
                {event.date}
              </span>
            )}
            <h3 className="text-xl font-serif text-primary mb-2">
              {event.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>
        )}
      </div>

      {/* Ícone central */}
      <div className="relative z-10 shrink-0">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-card border-2 border-secondary/30 flex items-center justify-center">
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
        </div>
      </div>

      {/* Conteúdo à direita (desktop) ou único (mobile) */}
      <div
        className={`flex-1 ${!isEven ? "md:pl-8" : "md:opacity-0"} text-left`}
      >
        {/* Mobile sempre mostra, desktop só se for ímpar */}
        <div className={`${isEven ? "md:hidden" : ""}`}>
          {event.date && (
            <span className="text-sm text-secondary font-medium block mb-1">
              {event.date}
            </span>
          )}
          <h3 className="text-xl font-serif text-primary mb-2">
            {event.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
};
