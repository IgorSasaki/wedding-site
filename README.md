# Wedding Site — Igor & Isabela

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Vite](https://img.shields.io/badge/Vite-7-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933)
![License](https://img.shields.io/badge/License-Private-yellow)

**Plataforma web completa de casamento com gestão de presentes, mensagens e RSVP**

[Demo ao Vivo](#) · [Sobre o Projeto](#sobre-o-projeto) · [Tech Stack](#tech-stack) · [Arquitetura](#arquitetura) · [Getting Started](#como-executar) · [Features](#features)

</div>

---

## 📋 Sobre o Projeto

Este é um **site de casamento completo** desenvolvido para o casal Igor Sasaki e Isabela Mardegan. A aplicação web permite que os convidados visualizem os detalhes do evento, confiram presença, dejem mensagens no muralvirtual e escolham presentes da lista — tudo integrado com a API do **Airtable** como CMS.

O projeto foi arquitetado com foco em **segurança**, **performance** e **experiência do usuário**, demonstrando competências Full Stack em um projeto real e completo.

---

## 🛠 Tech Stack

### Frontend

| Tecnologia          | Versão                 | Descrição                    |
| ------------------- | ---------------------- | ---------------------------- |
| **React**           | 19.x                   | Biblioteca principal de UI   |
| **TypeScript**      | 5.9                    | Tipagem estática completa    |
| **Vite**            | 7.x                    | Build tool e dev server      |
| **Tailwind CSS**    | 4.x                    | Framework de estilização     |
| **Framer Motion**   | 12.x                   | Animações declarativas       |
| **React Hook Form** | 7.x                    | Gerenciamento de formulários |
| **Zod**             | 4.x                    | Validação de esquemas        |
| **Axios**           | 1.x                    | Cliente HTTP                 |
| **React Router**    | 7.x                    | Roteamento SPA               |
| **Radix UI**        | Componentes acessíveis | Headless UI components       |
| **Lucide React**    | Ícones                 | Biblioteca de ícones         |
| **Sonner**          | Notificações           | Toast notifications          |

### Backend

| Tecnologia     | Versão | Descrição                     |
| -------------- | ------ | ----------------------------- |
| **Express.js** | 5.x    | Framework web Node.js         |
| **Axios**      | 1.x    | Cliente HTTP para Airtable    |
| **CORS**       | 2.x    | Cross-Origin Resource Sharing |
| **tsx**        | 4.x    | Executador TypeScript         |

### Infraestrutura & DevOps

| Tecnologia      | Descrição                   |
| --------------- | --------------------------- |
| **Airtable**    | Banco de dados e CMS        |
| **pnpm**        | Gerenciador de pacotes      |
| **ESLint**      | Linting de código           |
| **Prettier**    | Formatação de código        |
| **Husky**       | Git hooks                   |
| **lint-staged** | Git hooks para staged files |

---

## 🎯 Arquitetura do Projeto

```
wedding-site/
├── server/                    # Backend API (Express.js)
│   ├── index.ts              # Servidor principal
│   ├── .env                 # Variáveis de ambiente (NÃO versionado)
│   ├── .env.example         # Template de variáveis
│   └── tsconfig.json        # Configuração TypeScript
│
├── src/                      # Frontend (React + Vite)
│   ├── components/          # Componentes reutilizáveis
│   │   ├── animations/      # Animações (Fade, Stagger)
│   │   ├── ui/              # Componentes Radix UI + shadcn
│   │   └── ...              # Navigation, Cards, etc.
│   │
│   ├── config/              # Configurações centralizadas
│   │   ├── siteConfig.ts    # Configurações do site
│   │   ├── giftsConfig.ts   # Configuração de presentes
│   │   ├── faqConfig.ts     # FAQ centralizado
│   │   ├── timelineConfig.ts# Cronologia do casal
│   │   └── venueConfig.ts   # Configurações dolocal
│   │
│   ├── pages/               # Páginas da aplicação
│   │   └── Home/
│   │       └── _components/ # Componentes da home page
│   │
│   ├── services/            # Camada de API
│   │   └── api/
│   │       ├── client.ts    # Cliente Axios
│   │       ├── MessagesService.ts
│   │       └── GiftsService.ts
│   │
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilitários
│   ├── styles/             # Estilos globais
│   ├── App.tsx             # Componente raiz
│   └── main.tsx            # Entry point
│
├── public/                  # Arquivos estáticos
├── index.html              # HTML entry
├── vite.config.ts          # Configuração Vite
├── tsconfig.json           # Configuração TypeScript
├── eslint.config.js        # Configuração ESLint
├── postcss.config.mjs      # Configuração PostCSS
├── tailwind.config.js      # Configuração Tailwind (v4)
└── package.json           # Dependências e scripts
```

---

## 🔐 Arquitetura de Segurança

### Problema Original

O token da API do Airtable estava **exposto no frontend**, sendo possível extraí-lo do bundle JavaScript compilado. Qualquer usuário poderia acessar a base de dados completa.

### Solução Implementada

Arquitetura **Backend-for-Frontend (BFF)** com proxy de API:

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────┐
│   Navegador    │ ──────► │   Servidor API   │ ──────► │  Airtable   │
│  (React App)   │         │   (Express.js)   │         │   (Base)    │
│                │         │                  │         │             │
│ ❌ Sem token   │         │ ✅ Token aqui    │         │ 🔒 API Key  │
│ ❌ Dados       │         │ ✅ Proxy requests│         │ ✅ Dados    │
└─────────────────┘         └──────────────────┘         └─────────────┘
```

**Benefícios:**

- Token **nunca** exposto ao cliente
- Validação de requisições no backend
- CORS configurado para permitir apenasorigem do frontend
- Logging centralizado de erros

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

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- pnpm 8+
- Conta no Airtable (para configuração)

### Configuração

1. **Clone o repositório:**

```bash
git clone [<repo-url>](https://github.com/IgorSasaki/wedding-site)
cd wedding-site
```

2. **Instale as dependências:**

```bash
pnpm install
```

3. **Configure as variáveis de ambiente:**

Crie o arquivo `server/.env`:

```env
AIRTABLE_API_URL=https://api.airtable.com/v0/appXXXXXXXXXXXXXX
AIRTABLE_TOKEN=patXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
PORT=3001
```

4. **Execute o desenvolvimento (ambos servidores):**

```bash
pnpm run dev:all
```

Ou separadamente:

```bash
# Terminal 1 - Backend
pnpm run server

# Terminal 2 - Frontend
pnpm run dev
```

5. **Acesse:**

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api

### Build para Produção

```bash
# Frontend
pnpm run build

# Servidor (precisa compilar para JavaScript)
npx tsc -p server/tsconfig.json
```

---

## 📝 Decisões Técnicas

### Por que essa arquitetura?

1. **Airtable como CMS**
   - Permite que os noivos editem conteúdo sem código
   - Interface amigável para gerenciamento
   - API REST simples

2. **Proxy de API no backend**
   - Resolve vulnerabilidade de segurança com token exposto
   - Demonstra conhecimento de arquitetura BFF
   - Facilita futuras validações e cache

3. **Tailwind CSS v4**
   - Nova versão com CSS-first configuration
   - Performance superior
   - DX moderno

4. **React 19 + Vite 7**
   - Latest stable das tecnologias
   - React Compiler para otimizações
   - Hot Module Replacement rápido

5. **Radix UI + shadcn pattern**
   - Componentes headless e acessíveis
   - Total customização via Tailwind
   - Boa prática de mercado

---

## 🔧 Scripts Disponíveis

| Script                | Descrição                    |
| --------------------- | ---------------------------- |
| `pnpm run dev`        | Inicia frontend (Vite)       |
| `pnpm run server`     | Inicia backend (Express)     |
| `pnpm run dev:all`    | Inicia ambos simultaneamente |
| `pnpm run build`      | Build de produção            |
| `pnpm run lint`       | Linting com auto-fix         |
| `pnpm run lint:check` | Linting apenas               |
| `pnpm run format`     | Formatação Prettier          |
| `pnpm run commit`     | Conventional commits         |

---

## 📈 Possíveis Melhorias Futuras

- [ ] Autenticação para área administrativa
- [ ] Upload de fotos dos noivos
- [ ] Lista de حضور (RSVP) online
- [ ] Cache Redis no backend
- [ ] Rate limiting na API
- [ ] Deploy automatizado (Vercel + Railway)
- [ ] PWA para funcionamento offline

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
