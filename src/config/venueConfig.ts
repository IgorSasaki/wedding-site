export const VENUE_CONFIG = {
  ceremony: {
    title: "Cerimônia Religiosa",
    name: "Igreja Basílica São Bento",
    address: "Rua Padre Duarte, 1308",
    neighborhood: "Centro",
    city: "Araraquara - SP",
    fullAddress: "Rua Padre Duarte, 1308 – Centro – Araraquara/SP",
    time: "20h",
    // Link do Google Maps - substitua pelo link correto
    mapLink:
      "https://www.google.com/maps/place/Basílica+São+Bento/@-21.7612093,-48.1299912,15z/data=!4m6!3m5!1s0x94b8f3e89df1a065:0x8f8aac6a84955b4f!8m2!3d-21.794881!4d-48.1763089!16s%2Fg%2F11bw77rc_7?entry=ttu&g_ep=EgoyMDI2MDEyNS4wIKXMDSoASAFQAw%3D%3D",
    // Instruções adicionais
    instructions:
      "Por gentileza, pedimos que chegue com 30 minutos de antecedência.",
    // Ícone do Lucide React
    icon: "Church",
  },

  reception: {
    title: "Recepção",
    name: "Villagio Eventos",
    address: "Rua Pedro Sanches Alcarás, 1375",
    neighborhood: "Condomínio Satélite",
    city: "Araraquara - SP",
    fullAddress:
      "Rua Pedro Sanches Alcarás, 1375 – Condomínio Satélite – Araraquara/SP",
    time: "Logo após a cerimônia, vamos comemorar juntos",
    // Link do Google Maps - substitua pelo link correto
    mapLink:
      "https://www.google.com/maps/place/Villagio+Eventos/@-21.8037594,-48.1180531,17z/data=!3m1!4b1!4m6!3m5!1s0x94b8f5ce2d716f73:0x5784d39bd5108f46!8m2!3d-21.8037644!4d-48.1154782!16s%2Fg%2F11fm73ydc2?entry=ttu&g_ep=EgoyMDI2MDEyNS4wIKXMDSoASAFQAw%3D%3D",
    // Instruções adicionais
    instructions: "Estacionamento privativo ",
    // Ícone do Lucide React
    icon: "PartyPopper",
  },

  // Informações adicionais
  parking: {
    ceremony: "Estacionamento nas ruas próximas à igreja",
    reception: "Estacionamento privativo com manobrista",
  },
};

export type VENUE_CONFIG_TYPE = typeof VENUE_CONFIG;
