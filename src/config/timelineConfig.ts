export interface TimelineEvent {
  date?: string;
  description: string;
  icon: string;
  id: string;
  title: string;
}

export const TIMELINE_CONFIG: TimelineEvent[] = [
  {
    id: "first-meet",
    title: "Nos Conhecemos",
    date: "2019",
    description:
      "Foi num dia comum que nossos olhares se cruzaram pela primeira vez. O que parecia ser um encontro casual se transformou no início de uma linda história de amor.",
    icon: "Sparkles",
  },
  {
    id: "first-date",
    title: "Primeiro Encontro",
    date: "2019",
    description:
      "Nosso primeiro encontro foi mágico. Horas de conversa, risadas e a certeza de que algo especial estava nascendo entre nós.",
    icon: "Heart",
  },
  {
    id: "dating",
    title: "Início do Namoro",
    date: "2019",
    description:
      "Com borboletas no estômago e o coração acelerado, oficializamos nosso namoro. Era o começo de uma jornada que só ficaria mais bonita.",
    icon: "HeartHandshake",
  },
  {
    id: "proposal",
    title: "O Pedido",
    date: "2022",
    description:
      "Em um momento inesquecível, cheio de emoção e lágrimas de felicidade, veio o tão esperado pedido de casamento. Ela disse SIM!",
    icon: "Gem",
  },
  {
    id: "wedding",
    title: "O Grande Dia",
    date: "25 de Julho de 2026",
    description:
      "E agora, diante de Deus, família e amigos, uniremos nossas vidas para sempre. Este é apenas o começo da nossa eternidade juntos.",
    icon: "Church",
  },
];
