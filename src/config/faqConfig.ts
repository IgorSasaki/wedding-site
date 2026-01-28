export interface FAQItem {
  answer: string;
  id: string;
  question: string;
}

export const FAQ_CONFIG: FAQItem[] = [
  {
    id: "acompanhante",
    question: "Posso levar acompanhante?",
    answer:
      "O convite é pessoal e intransferível. Se o seu convite inclui acompanhante, estará especificado nele. Em caso de dúvidas, entre em contato conosco.",
  },
  {
    id: "criancas",
    question: "Crianças são bem-vindas?",
    answer:
      "Sim! Crianças são muito bem-vindas em nossa celebração. Teremos um espaço kids na recepção para que os pequenos também se divirtam.",
  },
  {
    id: "horario",
    question: "Qual o horário ideal para chegar?",
    answer:
      "Pedimos que chegue à igreja com pelo menos 30 minutos de antecedência (19h30) para que todos estejam acomodados quando a cerimônia começar às 20h.",
  },
  {
    id: "estacionamento",
    question: "Há estacionamento no local?",
    answer:
      "Na igreja, há estacionamento nas ruas próximas. Já no local da recepção (Villagio Eventos), há estacionamento privativo.",
  },
  {
    id: "traje",
    question: "Qual é o traje sugerido?",
    answer:
      "Sugerimos traje esporte fino. Pedimos apenas que evitem a cor branca, que é reservada para a noiva. 😉",
  },
  {
    id: "fotos",
    question: "Posso tirar fotos durante a cerimônia?",
    answer:
      "Pedimos que durante a cerimônia apenas nosso fotógrafo oficial registre o momento. Após a cerimônia e durante a festa, fiquem à vontade para fotografar e compartilhar.",
  },
  {
    id: "presente",
    question: "Onde posso ver a lista de presentes?",
    answer:
      "Nossa lista de presentes está disponível aqui mesmo no site, na seção 'Lista de Presentes'. Mas lembre-se: sua presença já é nosso maior presente!",
  },
  {
    id: "confirmacao",
    question: "Como confirmo minha presença?",
    answer:
      "Nossa assessora de eventos entrará em contato com você para confirmar sua presença. Caso tenha alguma dúvida, pode nos procurar diretamente.",
  },
];

export const FAQ_SECTION_CONFIG = {
  title: "Dúvidas Frequentes",
  subtitle:
    "Reunimos aqui as perguntas mais comuns. Se ainda tiver dúvidas, fale conosco!",
};
