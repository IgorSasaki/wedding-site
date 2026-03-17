# Wedding Site — Igor & Isabela

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-16-000000)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000)
![License](https://img.shields.io/badge/License-Private-yellow)

**Plataforma web completa de casamento com gestão de presentes, mensagens e RSVP**

[Demo ao Vivo](#) · [Sobre o Projeto](#sobre-o-projeto) · [Tech Stack](#tech-stack) · [Arquitetura](#arquitetura) · [Getting Started](#como-executar) · [Deploy](#deploy-vercel) · [Features](#features)

</div>

---

## 📋 Sobre o Projeto

Este é um **site de casamento completo** desenvolvido para o casal Igor Sasaki e Isabela Mardegan. A aplicação web permite que os convidados visualizem os detalhes do evento, confiram presença, dejem mensagens no mural virtual e escolham presentes da lista — tudo integrado com a API do **Airtable** como CMS.

O projeto foi arquitetado com foco em **segurança**, **performance** e **experiência do usuário**, demonstrando competências Full Stack em um projeto real e completo.

---

## 🛠 Tech Stack

### Frontend

| Tecnologia          | Versão                 | Descrição                    |
| ------------------- | ---------------------- | ---------------------------- |
| **React**           | 19.x                   | Biblioteca principal de UI   |
| **Next.js**         | 16.x                   | Framework React (App Router) |
| **TypeScript**      | 5.9                    | Tipagem estática completa    |
| **Tailwind CSS**    | 4.x                    | Framework de estilização     |
| **Framer Motion**   | 12.x                   | Animações declarativas       |
| **React Hook Form** | 7.x                    | Gerenciamento de formulários |
| **Zod**             | 4.x                    | Validação de esquemas        |
| **Axios**           | 1.x                    | Cliente HTTP                 |
| **Radix UI**        | Componentes acessíveis | Headless UI components       |
| **Lucide React**    | Ícones                 | Biblioteca de ícones         |
| **Sonner**          | Notificações           | Toast notifications          |

### Backend (API Routes)

| Tecnologia      | Versão | Descrição                  |
| --------------- | ------ | -------------------------- |
| **Next.js API** | 16.x   | Serverless API routes      |
| **Axios**       | 1.x    | Cliente HTTP para Airtable |

### Infraestrutura & DevOps

| Tecnologia      | Descrição                   |
| --------------- | --------------------------- |
| **Airtable**    | Banco de dados e CMS        |
| **Vercel**      | Deploy & Hosting            |
| **pnpm**        | Gerenciador de pacotes      |
| **ESLint**      | Linting de código           |
| **Prettier**    | Formatação de código        |
| **Husky**       | Git hooks                   |
| **lint-staged** | Git hooks para staged files |

---

## 🎯 Arquitetura do Projeto

```
wedding-site/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Página principal
│   │   └── api/                # API Routes (Serverless)
│   │       ├── messages/
│   │       │   └── route.ts   # GET & POST messages
│   │       └── gifts/
│   │           ├── route.ts     # GET gifts
│   │           └── [id]/
│   │               └── route.ts # PATCH gift status
│   │
│   ├── components/              # Componentes React
│   │   ├── animations/        # Animações (Fade, Stagger)
│   │   ├── ui/                # Componentes Radix UI + shadcn
│   │   ├── Navigation/        # Componente de navegação
│   │   ├── CountdownTimer/    # Timer regressivo
│   │   ├── FAQItem/           # Item de FAQ
│   │   ├── GiftCard/          # Card de presente
│   │   ├── HeroHeader/        # Header com countdown
│   │   ├── MessageCard/       # Card de mensagem
│   │   ├── Messages/          # Seção de mensagens
│   │   ├── OurStory/          # Nossa história
│   │   ├── ReserveConfirm/    # Confirmação de presença
│   │   ├── SectionTitle/      # Título de seção
│   │   ├── TimelineItem/      # Item de timeline
│   │   ├── WeddingDetails/    # Detalhes do casamento
│   │   └── Gifts/             # Lista de presentes
│   │
│   ├── config/                 # Configurações centralizadas
│   │   ├── siteConfig.ts      # Configurações do site
│   │   ├── giftsConfig.ts    # Configuração de presentes
│   │   ├── faqConfig.ts      # FAQ centralizado
│   │   ├── timelineConfig.ts  # Cronologia do casal
│   │   └── venueConfig.ts     # Configurações do local
│   │
│   ├── services/               # Camada de API
│   │   └── api/
│   │       ├── client.ts      # Cliente Axios
│   │       ├── MessagesService.ts
│   │       └── GiftsService.ts
│   │
│   ├── hooks/                 # Custom hooks
│   │   ├── useToast/         # Hook de notificações
│   │   └── UseMobile/        # Hook para detectar mobile
│   │
│   ├── lib/                   # Utilitários
│   │   └── utils.ts          # Funções utilitárias
│   │
│   └── styles/                # Estilos globais
│       └── global.css         # CSS global + Tailwind
│
├── public/                    # Arquivos estáticos
├── next.config.ts             # Configuração Next.js
├── tsconfig.json              # Configuração TypeScript
├── eslint.config.js          # Configuração ESLint
├── postcss.config.mjs        # Configuração PostCSS
├── vercel.json               # Configuração Vercel
└── package.json              # Dependências e scripts
```

---

## 🔐 Arquitetura de Segurança

### Problema Original

O token da API do Airtable estava **exposto no frontend**, sendo possível extraí-lo do bundle JavaScript compilado. Qualquer usuário poderia acessar a base de dados completa.

### Solução Implementada

Arquitetura **Backend-for-Frontend (BFF)** usando Next.js API Routes (Serverless Functions):

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────┐
│   Navegador    │ ──────► │  Next.js API     │ ──────► │  Airtable   │
│  (React App)   │         │  (Serverless)    │         │   (Base)    │
│                │         │                  │         │             │
│ ❌ Sem token   │         │ ✅ Token aqui    │         │ 🔒 API Key  │
│ ❌ Dados       │         │ ✅ Proxy requests│         │ ✅ Dados    │
└─────────────────┘         └──────────────────┘         └─────────────┘
```

**Benefícios:**

- Token **nunca** exposto ao cliente
- API Routes rodam no servidor (serverless)
- Sem necessidade de servidor dedicado
- Escalabilidade automática do Vercel
- Logging centralizado de erros

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- pnpm 8+
- Conta no Airtable (para configuração)

### Configuração

1. **Clone o repositório:**

```bash
git clone https://github.com/IgorSasaki/wedding-site
cd wedding-site
```

2. **Instale as dependências:**

```bash
pnpm install
```

3. **Configure as variáveis de ambiente:**

Crie o arquivo `.env.local`:

```env
AIRTABLE_API_URL=https://api.airtable.com/v0/appXXXXXXXXXXXXXX
AIRTABLE_TOKEN=patXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

4. **Execute o desenvolvimento:**

```bash
pnpm run dev
```

5. **Acesse:**

- Frontend: http://localhost:3000

### Build para Produção

```bash
pnpm run build
```

---

## ☁️ Deploy na Vercel

### Deploy Automático

1. **Fork este repositório** para sua conta do GitHub

2. **Acesse [Vercel.com](https://vercel.com)** e faça login

3. **Clique em "Add New..."** → "Project"

4. **Importe seu repositório** forkado

5. **Configure as variáveis de ambiente** em "Environment Variables":

| Nome               | Valor                                           |
| ------------------ | ----------------------------------------------- |
| `AIRTABLE_API_URL` | `https://api.airtable.com/v0/appXXXXXXXXXXXXXX` |
| `AIRTABLE_TOKEN`   | `patXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`              |

6. **Clique em "Deploy"**

### Deploy via CLI

```bash
# Instale a CLI do Vercel
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel
```

### Configurações de Build (Vercel)

O Vercel detecta automaticamente Next.js. As configurações padrão funcionam:

- **Build Command:** `pnpm run build`
- **Output Directory:** `.next`
- **Install Command:** `pnpm install`

---

## 📱 Features

### ✨ Seções do Site

1. **Hero Header**
   - Contagem regressiva para o grande dia
   - Imagem de capa personalizada
   - Mensagem de bênção

2. **Nossa História**
   - Timeline interativa com animações
   - Marcos: primeiro encontro, namoro, pedido, casamento

3. **Detalhes do Casamento**
   - Data, horário e local da cerimônia
   - Local da recepção com mapa
   - Traje sugerido

4. **Lista de Presentes**
   - Catálogo de presentes integrado ao Airtable
   - Status em tempo real (disponível/escolhido)
   - Marcação de presente como oferecido

5. **Mural de Mensagens**
   - Formulário com validação Zod
   - Exibição paginada de mensagens
   - Feedback visual com toasts

6. **Confirmação de Presença**
   - Informações de RSVP
   - Contato da assessoria

7. **FAQ**
   - Accordion interativo
   - Perguntas frequentes personalizáveis

### 🎨 Funcionalidades Técnicas

- **Animações suaves** com Framer Motion
- **Responsividade completa** (mobile-first)
- **Tipagem TypeScript** em 100% do código
- **Validação de formulários** com React Hook Form + Zod
- **Loading states** e tratamento de erros
- **Paginação** de mensagens
- **Configuração centralizada** via arquivos TypeScript
- **Componentes acessíveis** (Radix UI)
- **API Routes Serverless** no Vercel

---

## 📂 Estrutura de Dados (Airtable)

### Tabela: Messages

| Campo       | Tipo     | Descrição           |
| ----------- | -------- | ------------------- |
| id          | string   | ID único (Airtable) |
| name        | string   | Nome do remetente   |
| message     | string   | Mensagem            |
| email       | email    | Email (opcional)    |
| createdTime | datetime | Data de criação     |

### Tabela: Gifts

| Campo       | Tipo     | Descrição                                  |
| ----------- | -------- | ------------------------------------------ |
| id          | string   | ID único (Airtable)                        |
| name        | string   | Nome do presente                           |
| description | string   | Descrição                                  |
| category    | select   | Categoria (cozinha, sala, etc.)            |
| priority    | select   | Prioridade (essencial, importante, desejo) |
| priceRange  | string   | Faixa de preço                             |
| available   | boolean  | Disponibilidade                            |
| giftedBy    | string   | Nome de quem deu                           |
| giftedAt    | datetime | Data da escolha                            |

---

## 📝 Decisões Técnicas

### Por que Next.js + Vercel?

1. **API Routes Serverless**
   - Sem necessidade de servidor dedicado
   - Escalabilidade automática
   - Custo zero para início (tier gratuito)
   - Token da API protegido no backend

2. **Airtable como CMS**
   - Permite que os noivos editem conteúdo sem código
   - Interface amigável para gerenciamento
   - API REST simples

3. **Tailwind CSS v4**
   - Nova versão com CSS-first configuration
   - Performance superior
   - DX moderno

4. **React 19 + Next.js 16**
   - Latest stable das tecnologias
   - App Router ou Pages Router
   - Server Components (opcional)
   - Static & Dynamic Rendering

5. **Radix UI + shadcn pattern**
   - Componentes headless e acessíveis
   - Total customização via Tailwind
   - Boa prática de mercado

---

## 🔧 Scripts Disponíveis

| Script                | Descrição              |
| --------------------- | ---------------------- |
| `pnpm run dev`        | Inicia desenvolvimento |
| `pnpm run build`      | Build de produção      |
| `pnpm run start`      | Inicia produção        |
| `pnpm run lint`       | Linting com auto-fix   |
| `pnpm run lint:check` | Linting apenas         |
| `pnpm run format`     | Formatação Prettier    |
| `pnpm run commit`     | Conventional commits   |

---

## 📈 Possíveis Melhorias Futuras

- [ ] Autenticação para área administrativa
- [ ] Upload de fotos dos noivos
- [ ] Lista de RSVP online
- [ ] Cache com Redis/ISR
- [ ] Rate limiting na API
- [ ] PWA para funcionamento offline
- [ ] Analytics e monitoramento

---

## 📄 Licença

Este projeto é privado e desenvolvido para fins pessoais. Todo o código é propriedade do casal Igor & Isabela.

---

## 👏 Agradecimentos

Obrigado por conferir este projeto! 💙

Desenvolvido com ❤️ e ☕ por Igor Sasaki

<div align="center">

[![GitHub Stars](https://img.shields.io/github/stars/IgorSasaki/wedding-site?style=social)](https://github.com/IgorSasaki/wedding-site)

</div>
