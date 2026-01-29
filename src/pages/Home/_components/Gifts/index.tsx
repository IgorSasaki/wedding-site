import { Heart, Loader2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

import { FadeSection } from "@/components/animations/FadeSection";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { STAGGER_VARIANT_ITEMS } from "@/components/animations/StaggerContainer/data";
import GiftCard from "@/components/GiftCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import {
  GIFT_CATEGORIES,
  GiftCategory,
  GIFTS_INTRO_TEXT,
} from "@/config/giftsConfig";
import { useToast } from "@/hooks/useToast";

export const GiftsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    GiftCategory | "todas"
  >("todas");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [gifts, setGifts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadGifts = async () => {
    try {
      setGifts([]);
    } catch (error) {
      console.error("Erro ao carregar presentes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGifts();
  }, []);

  const handleMarkAsGiven = async (giftId: string, giftedBy: string) => {
    try {
      console.log({ giftId, giftedBy });

      await loadGifts();
      toast({
        title: "Presente marcado! 🎁",
        description: "Obrigado pela generosidade! O casal ficará muito feliz.",
      });
    } catch (error) {
      console.error({ handleMarkAsGivenError: error });

      toast({
        title: "Erro",
        description: "Não foi possível marcar o presente. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const filteredGifts = useMemo(() => {
    return gifts.filter((gift) => {
      const categoryMatch =
        selectedCategory === "todas" || gift.category === selectedCategory;
      const statusMatch = !showOnlyAvailable || gift.available;
      return categoryMatch && statusMatch;
    });
  }, [gifts, selectedCategory, showOnlyAvailable]);

  const availableCount = gifts.filter((g) => g.available).length;

  return (
    <section className="section gradient-bg" id="presentes">
      <div className="section-container">
        <FadeSection>
          <SectionTitle
            subtitle={GIFTS_INTRO_TEXT.subtitle}
            title={GIFTS_INTRO_TEXT.title}
          />
        </FadeSection>

        {/* Intro Message */}
        <FadeSection delay={0.2}>
          <div className="max-w-2xl mx-auto mb-10">
            <div className="watercolor-card p-6 text-center">
              <Heart className="w-8 h-8 text-secondary mx-auto mb-3" />
              <p className="text-muted-foreground leading-relaxed">
                {GIFTS_INTRO_TEXT.description}
              </p>
            </div>
          </div>
        </FadeSection>

        {/* Filters */}
        <FadeSection delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {GIFT_CATEGORIES.map((category) => (
                <Button
                  className={
                    selectedCategory === category.value
                      ? "bg-primary text-primary-foreground"
                      : "border-border hover:bg-secondary/10"
                  }
                  variant={
                    selectedCategory === category.value ? "default" : "outline"
                  }
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  size="sm"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                checked={showOnlyAvailable}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                type="checkbox"
              />
              <span className="text-sm text-muted-foreground">
                Mostrar apenas disponíveis ({availableCount} itens)
              </span>
            </label>
          </div>
        </FadeSection>

        {/* Gifts Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-secondary mx-auto" />
          </div>
        ) : (
          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.08}
          >
            {filteredGifts.map((gift) => (
              <StaggerItem key={gift.id} variants={STAGGER_VARIANT_ITEMS}>
                <GiftCard gift={gift} onMarkAsGiven={handleMarkAsGiven} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {!isLoading && filteredGifts.length === 0 && (
          <FadeSection>
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum presente encontrado com os filtros selecionados.
              </p>
            </div>
          </FadeSection>
        )}
      </div>
    </section>
  );
};
