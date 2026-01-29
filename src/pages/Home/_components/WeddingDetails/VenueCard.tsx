import { AlertCircle, Church, Clock, MapPin } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { ICON_MAP } from "./data";
import { VenueCardProps } from "./types";

export const VenueCard: React.FC<VenueCardProps> = ({
  title,
  name,
  address,
  neighborhood,
  city,
  time,
  instructions,
  mapLink,
  iconName,
}) => {
  const Icon = ICON_MAP[iconName] || Church;

  return (
    <Card className="watercolor-card h-full">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-secondary" />
        </div>
        <h3 className="font-serif text-2xl text-primary">{title}</h3>
        <p className="text-lg font-medium text-foreground">{name}</p>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <div className="flex items-start justify-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 mt-1 shrink-0" />
          <div className="text-sm">
            <p>{address}</p>
            <p>
              {neighborhood} – {city}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{time}</span>
        </div>

        {instructions && (
          <div className="flex items-start justify-center gap-2 text-sm text-secondary bg-secondary/5 rounded-lg p-3">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{instructions}</span>
          </div>
        )}

        <Button className="mt-4" variant="outline" asChild>
          <a href={mapLink} rel="noopener noreferrer" target="_blank">
            <MapPin className="w-4 h-4 mr-2" />
            Ver no Mapa
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};
