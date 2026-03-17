import "@/styles/global.css";

import type { AppProps } from "next/app";
import Head from "next/head";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Igor & Isabela - Nosso casamento em 25 de julho de 2026</title>
        <meta
          content="Estamos preparando o grande dia: o casamento de Igor e Isabela, em 25 de julho de 2026, em Araraquara. Aqui você encontra nossa história, informações da cerimônia e recepção, lista de presentes e um espaço para deixar seu carinho."
          name="description"
        />

        <meta
          content="Casamento Igor & Isabela - 25 de julho de 2026"
          property="og:title"
        />
        <meta
          content="Conheça nossa história, veja os detalhes da cerimônia e da recepção, acesso a lista de presentes e deixe uma mensagem especial para nós."
          property="og:description"
        />
        <meta
          content="https://www.igoreisabelajuntos.com.br/"
          property="og:url"
        />
        <meta content="website" property="og:type" />
        <meta
          content="https://www.igoreisabelajuntos.com.br/imagens/convite.jpeg"
          property="og:image"
        />
      </Head>
      <TooltipProvider>
        <Sonner />
        <Component {...pageProps} suppressHydrationWarning />
      </TooltipProvider>
    </>
  );
}
