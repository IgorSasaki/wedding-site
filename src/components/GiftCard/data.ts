import {
  UtensilsCrossed,
  Sofa,
  Bed,
  Bath,
  Briefcase,
  Plane,
  Lamp,
  Zap,
} from "lucide-react";
import React from "react";

export const CATEGORY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  cozinha: UtensilsCrossed,
  sala: Sofa,
  quarto: Bed,
  banheiro: Bath,
  escritório: Briefcase,
  experiências: Plane,
  decoração: Lamp,
  eletrodomésticos: Zap,
};

export const PRIORITY_COLORS: Record<string, string> = {
  alta: "bg-primary text-primary-foreground",
  média: "bg-secondary text-secondary-foreground",
  baixa: "bg-accent text-accent-foreground",
};

export const PRIORITY_LABELS: Record<string, string> = {
  alta: "Essencial",
  média: "Importante",
  baixa: "Desejo",
};
