import type { Metadata } from "next";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "Igor & Isabela - Nosso casamento em 25 de julho de 2026",
  description:
    "Estamos preparando o grande dia: o casamento de Igor e Isabela, em 25 de julho de 2026, em Araraquara. Aqui você encontra nossa história, informações da cerimônia e recepção, lista de presentes e um espaço para deixar seu carinho.",
  openGraph: {
    title: "Casamento Igor & Isabela - 25 de julho de 2026",
    description:
      "Conheça nossa história, veja os detalhes da cerimônia e da recepção, acesso a lista de presentes e deixe uma mensagem especial para nós.",
    url: "https://www.igoreisabelajuntos.com.br/",
    type: "website",
    images: [
      {
        url: "https://www.igoreisabelajuntos.com.br/imagens/convite.jpeg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lato:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <TooltipProvider>
          <Sonner />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
