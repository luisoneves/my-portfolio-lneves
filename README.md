# Luis Neves — Portfolio

Portfólio pessoal de Luis Otavio Neves Faustino — Engineering Lead · Software Architect · FATEC ADS.

Construído com foco em arquitetura-primeiro: identidade de produto, animações físicas e narrativa de projeto real.

---

## Stack

| Tecnologia       | Versão   | Função                            |
|------------------|----------|-----------------------------------|
| Next.js          | 16.1.6   | Framework principal (App Router)  |
| React            | 19.2.3   | UI                                |
| TypeScript       | ^5       | Tipagem strict                    |
| Tailwind CSS     | ^4       | Estilização                       |
| Framer Motion    | ^12      | Animações físicas (spring, tilt)  |
| Lenis            | ^1.3     | Smooth scroll com inércia         |
| cmdk             | ^1.1     | Command palette (⌘K)              |
| Radix UI Dialog  | ^1.1     | Acessibilidade do palette         |
| Vaul             | ^1.1     | Drawer                            |
| Sonner           | ^2.0     | Toasts                            |

---

## Rodando Localmente

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Lint
npm run lint
```

Acesse `http://localhost:3000`

---

## Estrutura do Projeto

```
├── app/
│   ├── curriculo/         # Rota /curriculo — currículo interativo
│   ├── globals.css        # Design tokens, selection, scrollbar
│   ├── layout.tsx         # Providers globais + meta OG
│   └── page.tsx           # Home — composição das seções
│
├── components/
│   ├── hero/
│   │   ├── AnimatedHeading.tsx    # Heading com stagger por palavra
│   │   └── TypingCycle.tsx        # Texto rotativo animado
│   ├── projects/
│   │   ├── EvolutionTimeline.tsx  # Trilha v1→v2→v3→v4
│   │   └── ProjectCard.tsx        # Card com tilt 3D + glow
│   ├── providers/
│   │   ├── PageTransition.tsx     # Transição entre páginas (blur+fade)
│   │   └── SmoothScrollProvider.tsx # Lenis smooth scroll
│   ├── resume/
│   │   └── ResumeDownloadButton.tsx
│   ├── sections/
│   │   ├── ArchitectureSection.tsx  # Monorepo + Clean Architecture
│   │   ├── CICDSection.tsx          # Pipeline visual
│   │   ├── ManifestoBlock.tsx       # Quote de posicionamento
│   │   ├── NotesSection.tsx         # Engineering notes cards
│   │   ├── ProjectsSection.tsx      # Grid de projetos com stagger
│   │   └── StackSection.tsx         # Stack por contexto de uso
│   ├── CommandPalette.tsx    # Palette ⌘K com navegação e links
│   ├── CommandPaletteHint.tsx
│   ├── Footer.tsx
│   └── Navbar.tsx
│
├── lib/
│   └── notes.ts            # Dados das engineering notes
│
└── public/
    └── robots.txt
```

---

## Funcionalidades

- **Page transitions** — fade + blur entre rotas via Framer Motion
- **Smooth scroll** — inércia física via Lenis
- **Hero animado** — texto cíclico rotativo e entrada por palavras
- **Trilha de projetos** — timeline v1→v4 com narrative de evolução
- **Cards 3D** — tilt seguindo o mouse + glow radial
- **Stagger reveal** — seções e cards animam ao entrar na viewport
- **Architecture section** — monorepo e camadas Clean Architecture
- **Command palette** — `⌘K` / `Ctrl+K` para navegar e abrir links
- **Currículo interativo** — rota `/curriculo` com download PDF
- **Dark mode** — via `prefers-color-scheme`

---

## Deploy

Hospedado na **Vercel** com deploy automático via push na `main`.

`dev-luisneves.me`

---

## Licença

Portfólio pessoal. Todos os direitos reservados.