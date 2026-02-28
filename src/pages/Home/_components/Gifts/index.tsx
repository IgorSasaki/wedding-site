import {
  Heart,
  Loader2,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

const GIFTS_PER_PAGE = 9;

export const GiftsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    GIFT_CATEGORIES | "todas"
  >("todas");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [allGifts, setAllGifts] = useState<Gift[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadGifts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await GiftsService.getAll();
      setAllGifts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao carregar presentes:", err);
      setError(
        "Não foi possível carregar a lista de presentes. Tente novamente.",
      );
      setAllGifts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGifts();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, showOnlyAvailable]);

  const handleMarkAsGiven = async (giftId: string, giftedBy: string) => {
    try {
      await GiftsService.markAsGiven(giftId, giftedBy);
      await loadGifts();
      toast({
        title: "Presente marcado! 🎁",
        description: "Obrigado pela generosidade! O casal ficará muito feliz.",
      });
    } catch (err) {
      console.error("Erro ao marcar o presente:", err);
      toast({
        title: "Erro",
        description: "Não foi possível marcar o presente. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const filteredGifts = useMemo(() => {
    if (!Array.isArray(allGifts)) return [];
    return allGifts.filter((gift) => {
      const categoryMatch =
        selectedCategory === "todas" || gift.category === selectedCategory;
      const statusMatch = !showOnlyAvailable || gift.available;
      return categoryMatch && statusMatch;
    });
  }, [allGifts, selectedCategory, showOnlyAvailable]);

  // Paginação local: total de páginas e fatia da lista filtrada
  const totalPages = Math.ceil(filteredGifts.length / GIFTS_PER_PAGE);
  const paginatedGifts = useMemo(() => {
    const start = (currentPage - 1) * GIFTS_PER_PAGE;
    return filteredGifts.slice(start, start + GIFTS_PER_PAGE);
  }, [filteredGifts, currentPage]);

  const availableCount = Array.isArray(allGifts)
    ? allGifts.filter((g) => g.available).length
    : 0;

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    document
      .getElementById("presentes")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderPaginationButtons = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }

    return pages.map((p, idx) =>
      p === "ellipsis" ? (
        <span className="px-2 text-muted-foreground" key={`ellipsis-${idx}`}>
          …
        </span>
      ) : (
        <Button
          className={
            currentPage === p ? "bg-primary text-primary-foreground" : ""
          }
          key={p}
          onClick={() => goToPage(p)}
          size="sm"
          variant={currentPage === p ? "default" : "outline"}
        >
          {p}
        </Button>
      ),
    );
  };

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

        {!isLoading && !error && paginatedGifts.length > 0 && (
          <>
            <StaggerContainer
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              staggerDelay={0.08}
            >
              {paginatedGifts.map((gift) => (
                <GiftCard
                  gift={gift}
                  key={gift.id}
                  onMarkAsGiven={handleMarkAsGiven}
                />
              ))}
            </StaggerContainer>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <Button
                  className="gap-1"
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                  size="sm"
                  variant="outline"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>

                <div className="flex items-center gap-1">
                  {renderPaginationButtons()}
                </div>

                <Button
                  className="gap-1"
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                  size="sm"
                  variant="outline"
                >
                  Próximo
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Page info */}
            <p className="text-center text-xs text-muted-foreground mt-3">
              Mostrando {(currentPage - 1) * GIFTS_PER_PAGE + 1}–
              {Math.min(currentPage * GIFTS_PER_PAGE, filteredGifts.length)} de{" "}
              {filteredGifts.length} presentes
            </p>
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredGifts.length === 0 && (
          <FadeSection>
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {allGifts.length === 0
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
