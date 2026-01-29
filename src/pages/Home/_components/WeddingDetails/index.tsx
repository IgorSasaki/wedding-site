import { Church, MapPin, Clock, AlertCircle, Shirt } from "lucide-react";

import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SITE_CONFIG } from "@/config/siteConfig";
import { VENUE_CONFIG } from "@/config/venueConfig";

import { ICON_MAP } from "./data";
import { VenueCardProps } from "./types";

const VenueCard = ({
  title,
  name,
  address,
  neighborhood,
  city,
  time,
  instructions,
  mapLink,
  iconName,
}: VenueCardProps) => {
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

export const WeddingDetails = () => {
  return (
    <section className="section" id="detalhes">
      <div className="section-container">
        <SectionTitle
          subtitle="Todas as informações para você celebrar conosco"
          title="Detalhes do Casamento"
        />

        {/* Venue Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mb-12">
          <VenueCard
            address={VENUE_CONFIG.ceremony.address}
            city={VENUE_CONFIG.ceremony.city}
            iconName={VENUE_CONFIG.ceremony.icon}
            instructions={VENUE_CONFIG.ceremony.instructions}
            mapLink={VENUE_CONFIG.ceremony.mapLink}
            name={VENUE_CONFIG.ceremony.name}
            neighborhood={VENUE_CONFIG.ceremony.neighborhood}
            time={VENUE_CONFIG.ceremony.time}
            title={VENUE_CONFIG.ceremony.title}
          />
          <VenueCard
            address={VENUE_CONFIG.reception.address}
            city={VENUE_CONFIG.reception.city}
            iconName={VENUE_CONFIG.reception.icon}
            instructions={VENUE_CONFIG.reception.instructions}
            mapLink={VENUE_CONFIG.reception.mapLink}
            name={VENUE_CONFIG.reception.name}
            neighborhood={VENUE_CONFIG.reception.neighborhood}
            time={VENUE_CONFIG.reception.time}
            title={VENUE_CONFIG.reception.title}
          />
        </div>

        {/* Dress Code */}
        <div className="max-w-md mx-auto text-center">
          <Card className="watercolor-card">
            <CardContent className="pt-6">
              <div className="w-12 h-12 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Shirt className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-serif text-xl text-primary mb-2">
                {SITE_CONFIG.dressCode.title}
              </h4>
              <p className="text-lg font-medium text-secondary mb-2">
                {SITE_CONFIG.dressCode.suggestion}
              </p>
              <p className="text-sm text-muted-foreground">
                {SITE_CONFIG.dressCode.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
