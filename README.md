# JJMTA

A personal portfolio built with Astro, TypeScript, and SCSS, featuring a clean design, responsive layout, and a working contact form.

## About

This is my personal portfolio showcasing my projects and skills as a web developer. Aside from web development, in the future I plan to add other programming projects from other areas like game development, web scraping, etc. Built for performance and simplicity.

## Tech Stack

- **Framework** — [Astro](https://astro.build)
- **Language** — [TypeScript](https://www.typescriptlang.org/)
- **Styling** — [SCSS](https://sass-lang.com/)
- **Contact Form** — [Formspree](https://formspree.io)
- **CAPTCHA** — [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile)

## Features

- Fast, static-first architecture via Astro
- Fully responsive layout
- Contact form with spam protection via Cloudflare Turnstile
- Scoped component styles with SCSS

## Getting Started

```sh
# Install dependencies
npm ci

# Start local dev server at localhost:4321
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# ==== OPTIONAL ====

# Enforce JavaScript/TypeScript coding standards and improve code quality
npm run lint:fix

# Same as above, but for SCSS
npm run lint:scss:fix
```

### Docker

If you prefer local development with Docker and have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed, this repo already has the necessary Docker files so you can simply run the following command in your terminal:

```
docker compose up
```

## Project Structure

```text
/
├── .github/workflows    # ci workflows
├── public/              # public files
├── src/
│   ├── assets/          # project screenshots
│   ├── components/
│   │   ├── navbar/      # navbar component
│   │   └── projects/    # project section and project card component
│   ├── data/            # project list data (json)
│   │   └── projects.json
│   ├── layouts/         # html document
│   │   └── Layout.astro
│   ├── pages/           # components that are found inside <body>
│   │   └── index.astro
│   ├── styles/          # SCSS (7-1 pattern)
│   │   ├── abstracts/   # variables and mixins
│   │   ├── base/        # base styles
│   │   ├── components/  # component styles
│   │   ├── layout/      # page section styles (navbar, footer, hero, etc.)
│   │   └── main.scss
│   ├── types/           # typescript types and interfaces
│   │   └── project.ts
│   └── utils/           # typescript utility functions
├── tests/
│   ├── e2e/             # playwright
│   └── unit/            # vitest
└── ... (other repo files)
```

## Deployment

This project is deployed to Cloudflare Pages via GitHub Actions using [`cloudflare/wrangler-action`](https://github.com/cloudflare/wrangler-action). Automatic deployments from Cloudflare are disabled — deployments are triggered by the CI workflow instead, which allows the preview URL to be captured and used for end-to-end tests before promoting to production.

Live site [here](https://jjmta.pages.dev/).

## License

**MIT**
