import { Gift as GiftIcon, Check, Loader2, Heart } from "lucide-react";
import React, { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { CATEGORY_ICONS, PRIORITY_COLORS, PRIORITY_LABELS } from "./data";
import { GiftCardProps } from "./types";

const GiftCard: React.FC<GiftCardProps> = ({ gift, onMarkAsGiven }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [giftedBy, setGiftedBy] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const CategoryIcon = CATEGORY_ICONS[gift.category] || GiftIcon;
  const isGifted = !gift.available;

  const handleConfirmGift = async () => {
    if (!giftedBy.trim() || !onMarkAsGiven) return;

    setIsSubmitting(true);
    try {
      await onMarkAsGiven(gift.id, giftedBy.trim());
      setIsDialogOpen(false);
      setGiftedBy("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card
        className={`watercolor-card transition-all duration-300 hover-lift ${isGifted ? "opacity-60" : ""}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <CategoryIcon className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-primary leading-tight">
                  {gift.name}
                </h3>
                <span className="text-xs text-muted-foreground capitalize">
                  {gift.category}
                </span>
              </div>
            </div>
            <Badge
              className={
                PRIORITY_COLORS[gift.priority] || PRIORITY_COLORS.média
              }
            >
              {PRIORITY_LABELS[gift.priority] || "Importante"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {gift.description}
          </p>

          {gift.priceRange && (
            <p className="text-sm font-medium text-primary/80">
              {gift.priceRange}
            </p>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            {isGifted ? (
              <div className="status-badge status-gifted">
                <Check className="w-3 h-3" />
                <span>
                  Presenteado{gift.giftedBy ? ` por ${gift.giftedBy}` : ""}
                </span>
              </div>
            ) : (
              <>
                <div className="status-badge status-available">
                  <GiftIcon className="w-3 h-3" />
                  <span>Disponível</span>
                </div>

                {onMarkAsGiven && (
                  <Button
                    className="text-secondary hover:bg-secondary/10 border-secondary/30"
                    onClick={() => setIsDialogOpen(true)}
                    size="sm"
                    variant="outline"
                  >
                    <Heart className="w-3 h-3 mr-1" />
                    Vou Presentear
                  </Button>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialog para confirmar presente */}
      <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-primary">
              Confirmar Presente 🎁
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Você está presenteando: <strong>{gift.name}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-primary"
                htmlFor="giftedBy"
              >
                Seu nome *
              </label>
              <Input
                id="giftedBy"
                onChange={(e) => setGiftedBy(e.target.value)}
                placeholder="Como você se chama?"
                value={giftedBy}
              />
              <p className="text-xs text-muted-foreground">
                Seu nome ficará registrado para que o casal saiba quem foi o
                anjo generoso! 💙
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              disabled={isSubmitting}
              onClick={() => setIsDialogOpen(false)}
              variant="outline"
            >
              Cancelar
            </Button>
            <Button
              className="btn-wedding"
              disabled={!giftedBy.trim() || isSubmitting}
              onClick={handleConfirmGift}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Heart className="w-4 h-4" />
              )}
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GiftCard;
