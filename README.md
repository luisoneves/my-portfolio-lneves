# Luis Neves Portfolio

![Luis Neves Portfolio](assets/images/og-image.png)

Portfólio pessoal de Luis Neves, Desenvolvedor Fullstack e Front-end.

## 🚀 Tecnologias

- **HTML5**: Semântico e acessível.
- **CSS3**: Arquitetura modular com Design Tokens e variáveis CSS.
- **JavaScript**: ES6+ Modules (Vanilla).
- **Tooling**: Vite, PostCSS, ESBuild, Prettier, ESLint.

## 🛠️ Como Usar

Este projeto foi construído para ser simples e leve, sem necessidade de dependências complexas ou processos de build.

1. **Clone o repositório:**
```bash
git clone https://github.com/luisoneves/my-portfolio-lneves.git
```

2. **Abra o projeto:**
Você pode simplesmente abrir o arquivo `index.html` no seu navegador.

**Recomendado:** Para garantir que os Módulos JavaScript funcionem corretamente (evitando erros de CORS), use uma extensão de "Live Server" no VSCode ou um servidor local simples, como:

- **VSCode:** Instale a extensão "Live Server" e clique em "Go Live".
- **Python:** `python3 -m http.server`
- **Node (npx):** `npx serve`

## 📂 Estrutura de Pastas

A estrutura foi reorganizada para facilitar a manutenção e escalabilidade:

```
├── images/
│   └── favicon/      # Favicons e ícones
├── public/
│   ├── favicon/      # Favicons públicos
│   └── images/       # Imagens públicas
├── src/
│   ├── scripts/      # Javascript Modular (ES6)
│   │   └── main.js   # Ponto de entrada
│   └── styles/       # CSS Nativo (sem pre-processadores)
│       ├── base.css      # Reset, Tokens, Tipografia
│       ├── components.css# Componentes (Buttons, Cards, Tags)
│       ├── layout.css    # Grid, Sections, Header, Footer
│       └── main.css      # Ponto de entrada CSS
├── index.html        # Página principal
└── README.md         # Documentação
```

## 🎨 Design System

O projeto utiliza **CSS Nativo** com variáveis (Custom Properties) para garantir consistência, substituindo a necessidade de frameworks como Tailwind. Isso resulta em um código mais leve e performático.

### Cores Principais
- Brand Primary: `#d76f30`
- Brand Neon (Dark Mode): `#00ff88`

## 📄 Licença

Este projeto é para fins de portfólio pessoal. Todos os direitos reservados.
