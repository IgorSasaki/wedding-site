export interface GiftCardGift {
  available: boolean;
  category: string;
  description: string;
  giftedBy?: string;
  id: string;
  name: string;
  priceRange?: string;
  priority: string;
}

export interface GiftCardProps {
  gift: GiftCardGift;
  onMarkAsGiven?: (giftId: string, giftedBy: string) => Promise<void>;
}
