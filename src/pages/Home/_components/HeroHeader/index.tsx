import { SITE_CONFIG } from "@/config/siteConfig";
import { Button } from "@/components/ui/button";
import { Calendar, Gift } from "lucide-react";
import { CountdownTimer } from "@/components/CountdownTimer";

export const HeroHeader = () => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-20">
        <svg viewBox="0 0 200 200" className="w-full h-full text-secondary">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-80 h-80 opacity-20">
        <svg viewBox="0 0 200 200" className="w-full h-full text-accent">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
        {/* Blessing text */}
        <p className="font-script text-2xl md:text-3xl lg:text-4xl text-secondary mb-6 animate-fade-in">
          {SITE_CONFIG.hero.blessing}
        </p>

        {/* Couple names */}
        <h1 className="font-script text-5xl md:text-7xl lg:text-8xl text-primary mb-4 animate-fade-in-up">
          {SITE_CONFIG.couple.person1}
          <span className="text-secondary mx-2 md:mx-4">&</span>
          {SITE_CONFIG.couple.person2}
        </h1>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="h-px w-16 md:w-24 bg-linear-to-r from-transparent to-secondary" />
          <span className="text-secondary text-3xl">✿</span>
          <div className="h-px w-16 md:w-24 bg-linear-to-l from-transparent to-secondary" />
        </div>

        {/* Wedding date */}
        <p className="font-serif text-xl md:text-2xl text-foreground/80 mb-12">
          {SITE_CONFIG.wedding.dateFormatted}
        </p>

        {/* Countdown */}
        <div className="mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
            Faltam para o grande dia
          </p>
          <CountdownTimer />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => handleScroll("#detalhes")}
            className="btn-wedding min-w-[200px]"
          >
            <Calendar className="w-4 h-4" />
            Ver Detalhes
          </Button>
          <Button
            onClick={() => handleScroll("#presentes")}
            variant="outline"
            className="btn-wedding-outline min-w-[200px]"
          >
            <Gift className="w-4 h-4" />
            Lista de Presentes
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-secondary/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-secondary/50 animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
};

