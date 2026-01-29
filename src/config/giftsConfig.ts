export type GiftPriority = "essencial" | "importante" | "desejo";
export type GiftStatus = "disponível" | "presenteado" | "cotas";
export type GiftCategory =
  | "cozinha"
  | "sala"
  | "quarto"
  | "banheiro"
  | "escritório"
  | "experiências"
  | "eletrodomésticos"
  | "decoração";

export interface Gift {
  category: GiftCategory;
  description: string;
  externalLink?: string;
  id: string;
  image?: string;
  name: string;
  priceRange?: string;
  priority: GiftPriority;
  status: GiftStatus;
}

export const GIFTS_CONFIG: Gift[] = [
  // COZINHA
  {
    id: "airfryer",
    name: "Air Fryer",
    description:
      "Para preparar refeições práticas e saudáveis no dia a dia do casal.",
    category: "cozinha",
    priceRange: "R$ 300 - R$ 600",
    priority: "essencial",
    status: "disponível",
  },
  {
    id: "jogo-panelas",
    name: "Jogo de Panelas Antiaderente",
    description:
      "Um conjunto completo para equipar nossa cozinha com qualidade.",
    category: "cozinha",
    priceRange: "R$ 400 - R$ 800",
    priority: "essencial",
    status: "disponível",
  },
  {
    id: "cafeteira",
    name: "Cafeteira Elétrica",
    description:
      "Para começar nossas manhãs com um café fresquinho feito em casa.",
    category: "cozinha",
    priceRange: "R$ 150 - R$ 400",
    priority: "importante",
    status: "disponível",
  },
  {
    id: "liquidificador",
    name: "Liquidificador Potente",
    description: "Essencial para sucos, vitaminas e receitas do dia a dia.",
    category: "cozinha",
    priceRange: "R$ 150 - R$ 350",
    priority: "essencial",
    status: "presenteado",
  },
  {
    id: "jogo-talheres",
    name: "Faqueiro Completo",
    description: "Um jogo elegante de talheres para receber família e amigos.",
    category: "cozinha",
    priceRange: "R$ 200 - R$ 500",
    priority: "importante",
    status: "disponível",
  },

  // SALA
  {
    id: "sofa",
    name: "Sofá de 3 Lugares",
    description: "O coração da nossa sala, onde vamos criar memórias juntos.",
    category: "sala",
    priceRange: "R$ 2.000 - R$ 4.000",
    priority: "essencial",
    status: "cotas",
  },
  {
    id: "tv",
    name: 'Smart TV 55"',
    description: "Para nossas sessões de filmes e séries abraçadinhos no sofá.",
    category: "sala",
    priceRange: "R$ 2.500 - R$ 4.000",
    priority: "importante",
    status: "disponível",
  },
  {
    id: "mesa-jantar",
    name: "Mesa de Jantar 6 Lugares",
    description:
      "Para reunir a família em almoços de domingo e jantares especiais.",
    category: "sala",
    priceRange: "R$ 1.500 - R$ 3.000",
    priority: "essencial",
    status: "disponível",
  },

  // QUARTO
  {
    id: "jogo-cama",
    name: "Jogo de Cama King Size",
    description: "Lençóis macios para noites de sono tranquilo.",
    category: "quarto",
    priceRange: "R$ 300 - R$ 600",
    priority: "importante",
    status: "disponível",
  },
  {
    id: "cobertor",
    name: "Edredom King Size",
    description: "Para nos aquecer nas noites mais frias.",
    category: "quarto",
    priceRange: "R$ 250 - R$ 500",
    priority: "importante",
    status: "disponível",
  },
  {
    id: "travesseiros",
    name: "Kit Travesseiros de Pluma",
    description: "Conforto extra para um sono reparador.",
    category: "quarto",
    priceRange: "R$ 200 - R$ 400",
    priority: "desejo",
    status: "disponível",
  },

  // BANHEIRO
  {
    id: "jogo-toalhas",
    name: "Jogo de Toalhas de Banho",
    description: "Toalhas macias e felpudas para nosso banheiro.",
    category: "banheiro",
    priceRange: "R$ 150 - R$ 300",
    priority: "importante",
    status: "disponível",
  },

  // ELETRODOMÉSTICOS
  {
    id: "aspirador",
    name: "Aspirador de Pó Vertical",
    description: "Para manter nossa casa sempre limpinha com praticidade.",
    category: "eletrodomésticos",
    priceRange: "R$ 400 - R$ 800",
    priority: "importante",
    status: "disponível",
  },
  {
    id: "ferro-passar",
    name: "Ferro de Passar a Vapor",
    description: "Para deixar nossas roupas sempre impecáveis.",
    category: "eletrodomésticos",
    priceRange: "R$ 100 - R$ 250",
    priority: "importante",
    status: "presenteado",
  },

  // EXPERIÊNCIAS
  {
    id: "lua-de-mel",
    name: "Contribuição Lua de Mel",
    description:
      "Ajude-nos a realizar o sonho da nossa lua de mel inesquecível!",
    category: "experiências",
    priceRange: "Qualquer valor",
    priority: "desejo",
    status: "cotas",
  },
  {
    id: "jantar-romantico",
    name: "Jantar Romântico",
    description:
      "Um presente para celebrarmos nosso amor em um restaurante especial.",
    category: "experiências",
    priceRange: "R$ 300 - R$ 500",
    priority: "desejo",
    status: "disponível",
  },

  // DECORAÇÃO
  {
    id: "quadros",
    name: "Kit de Quadros Decorativos",
    description:
      "Para deixar nossa casa com a nossa cara e cheio de boas energias.",
    category: "decoração",
    priceRange: "R$ 200 - R$ 400",
    priority: "desejo",
    status: "disponível",
  },
];

// Categorias disponíveis para filtro
export const GIFT_CATEGORIES: {
  value: GiftCategory | "todas";
  label: string;
}[] = [
  { value: "todas", label: "Todas as Categorias" },
  { value: "cozinha", label: "Cozinha" },
  { value: "sala", label: "Sala" },
  { value: "quarto", label: "Quarto" },
  { value: "banheiro", label: "Banheiro" },
  { value: "eletrodomésticos", label: "Eletrodomésticos" },
  { value: "decoração", label: "Decoração" },
  { value: "experiências", label: "Experiências" },
];

// Texto informativo no topo da lista
export const GIFTS_INTRO_TEXT = {
  title: "Lista de Presentes",
  subtitle: "Sua presença é o nosso maior presente!",
  description:
    "Preparamos esta lista com carinho, mas ela é apenas uma sugestão. O mais importante para nós é ter você ao nosso lado neste dia especial. Se desejar nos presentear, escolha o que couber no seu coração. 💙",
};
