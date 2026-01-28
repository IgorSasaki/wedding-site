export const SITE_CONFIG = {
  // Informações do casal
  couple: {
    person1: "Igor",
    person2: "Isabela",
    // Nome completo para uso formal
    fullName1: "Igor Sasaki",
    fullName2: "Isabela Mardegan",
  },

  // Data e horário do casamento
  wedding: {
    date: new Date("2026-07-25T20:00:00"),
    dateFormatted: "25 de julho de 2026",
    time: "20h",
    arrivalTime: "19h30", // 30 minutos antes
  },

  // Textos do Hero
  hero: {
    blessing: "Sob a bênção de Deus, unimos nossas vidas",
    subtitle: "Convidamos você para celebrar o nosso amor",
  },

  // Seção de confirmação de presença
  rsvp: {
    title: "Confirmação de Presença",
    message:
      "A nossa assessora entrará em contato para confirmar sua presença. Aguarde nosso contato e, se tiver alguma dúvida, fique à vontade para nos procurar.",
    contactName: "Assessoria de Eventos",
    // Opcional: número de WhatsApp da assessora
    whatsapp: "", // Ex: "5516999999999"
  },

  // Traje sugerido
  dressCode: {
    title: "Traje Sugerido",
    suggestion: "Esporte Fino",
    description:
      "Sugerimos traje esporte fino. Evite branco, para não confundir com a noiva! 😉",
  },

  // Rodapé
  footer: {
    quote: "E assim, dois corações se tornam um só...",
    signature: "Com amor, Igor & Isabela",
  },

  // Redes sociais / Links externos (opcional)
  social: {
    instagram: "", // Ex: "https://instagram.com/igorisabela"
    hashtag: "#IgorEIsabela2026",
  },

  // Configurações da seção de mensagens
  messages: {
    title: "Deixe sua Mensagem",
    subtitle: "Compartilhe seu carinho e bons desejos para nós",
    placeholder: "Escreva aqui sua mensagem de carinho para os noivos...",
  },
};

export type SITE_CONFIG_TYPE = typeof SITE_CONFIG;
