import { Heart, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";

import { FadeSection } from "@/components/animations/FadeSection";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import GiftCard from "@/components/GiftCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import {
  Gift,
  GIFT_CATEGORIES,
  GIFT_CATEGORIES_LIST,
  GIFTS_INTRO_TEXT,
} from "@/config/giftsConfig";
import { useToast } from "@/hooks/useToast";
import { GiftsService } from "@/services/api/GiftsService";

export const GiftsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    GIFT_CATEGORIES | "todas"
  >("todas");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadGifts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await GiftsService.getAll();

      setGifts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao carregar presentes:", err);
      setError(
        "Não foi possível carregar a lista de presentes. Tente novamente.",
      );
      setGifts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGifts();
  }, []);

  const handleMarkAsGiven = async (giftId: string, giftedBy: string) => {
    try {
      await GiftsService.markAsGiven(giftId, giftedBy);

      await loadGifts();
      toast({
        title: "Presente marcado! 🎁",
        description: "Obrigado pela generosidade! O casal ficará muito feliz.",
      });
    } catch (error) {
      console.error("Erro ao marcar o presente:", error);
      toast({
        title: "Erro",
        description: "Não foi possível marcar o presente. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const filteredGifts = useMemo(() => {
    if (!Array.isArray(gifts)) return [];
    return gifts.filter((gift) => {
      const categoryMatch =
        selectedCategory === "todas" || gift.category === selectedCategory;
      const statusMatch = !showOnlyAvailable || gift.available;
      return categoryMatch && statusMatch;
    });
  }, [gifts, selectedCategory, showOnlyAvailable]);

  const availableCount = Array.isArray(gifts)
    ? gifts.filter((g) => g.available).length
    : 0;

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
              {GIFT_CATEGORIES_LIST.map((category) => (
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

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <Loader2 className="w-10 h-10 animate-spin text-secondary mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando presentes...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <FadeSection>
            <div className="text-center py-12">
              <div className="watercolor-card max-w-md mx-auto p-6">
                <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button className="gap-2" onClick={loadGifts} variant="outline">
                  <RefreshCw className="w-4 h-4" />
                  Tentar novamente
                </Button>
              </div>
            </div>
          </FadeSection>
        )}

        {/* Gifts Grid */}
        {!isLoading && !error && filteredGifts.length > 0 && (
          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.08}
          >
            {filteredGifts.map((gift) => (
              // <StaggerItem key={gift.id} variants={STAGGER_VARIANT_ITEMS}>
              <GiftCard
                gift={gift}
                key={gift.id}
                onMarkAsGiven={handleMarkAsGiven}
              />
              // </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredGifts.length === 0 && (
          <FadeSection>
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {gifts.length === 0
                  ? "Nenhum presente cadastrado ainda."
                  : "Nenhum presente encontrado com os filtros selecionados."}
              </p>
            </div>
          </FadeSection>
        )}
      </div>
    </section>
  );
};
