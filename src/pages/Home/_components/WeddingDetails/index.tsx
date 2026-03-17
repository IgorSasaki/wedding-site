"use client";

import { Shirt } from "lucide-react";
import React from "react";

import { FadeSection } from "@/components/animations/FadeSection";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { STAGGER_VARIANT_ITEMS } from "@/components/animations/StaggerContainer/data";
import { SectionTitle } from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/config/siteConfig";
import { VENUE_CONFIG } from "@/config/venueConfig";

import { VenueCard } from "./VenueCard";

export const WeddingDetails: React.FC = () => {
  return (
    <section className="section" id="detalhes">
      <div className="section-container">
        <FadeSection>
          <SectionTitle
            subtitle="Preparamos tudo com muito carinho e ficaremos felizes em celebrar esse momento ao seu lado.
Abaixo você encontra as informações sobre a cerimônia e a recepção."
            title="Detalhes do Casamento"
          />
        </FadeSection>

        {/* Venue Cards */}
        <StaggerContainer
          className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mb-12"
          staggerDelay={0.2}
        >
          <StaggerItem variants={STAGGER_VARIANT_ITEMS}>
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
          </StaggerItem>
          <StaggerItem variants={STAGGER_VARIANT_ITEMS}>
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
          </StaggerItem>
        </StaggerContainer>

        {/* Dress Code */}
        <FadeSection delay={0.4}>
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
        </FadeSection>
      </div>
    </section>
  );
};
