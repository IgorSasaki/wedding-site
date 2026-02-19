export type GIFT_PRIORITY = "essencial" | "importante" | "desejo";
export type GIFT_CATEGORIES =
  | "cozinha"
  | "sala"
  | "quarto"
  | "banheiro"
  | "escritório"
  | "experiências"
  | "eletrodomésticos"
  | "decoração";

// Array de categorias para uso em runtime
export const GIFT_CATEGORIES_LIST: Array<{
  value: GIFT_CATEGORIES;
  label: string;
}> = [
  { value: "cozinha", label: "Cozinha" },
  { value: "sala", label: "Sala" },
  { value: "quarto", label: "Quarto" },
  { value: "banheiro", label: "Banheiro" },
  { value: "escritório", label: "Escritório" },
  { value: "experiências", label: "Experiências" },
  { value: "eletrodomésticos", label: "Eletrodomésticos" },
  { value: "decoração", label: "Decoração" },
];

export interface Gift {
  available: boolean;
  category: GIFT_CATEGORIES;
  description: string;
  giftedAt?: string;
  giftedBy?: string;
  id: string;
  name: string;
  priceRange?: string;
  priority: GIFT_PRIORITY;
}

// Texto informativo no topo da lista
export const GIFTS_INTRO_TEXT = {
  title: "Lista de Presentes",
  subtitle: "Sua presença é o nosso maior presente!",
  description:
    "Sua presença é o nosso maior presente. Mas, se desejar nos presentear, preparamos com carinho uma lista com itens que vão fazer parte do nosso novo lar. Você pode escolher o que preferir – cada gesto de carinho fará parte da nossa história.",
};
