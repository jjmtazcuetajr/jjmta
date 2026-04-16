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
├── .github/workflows
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── navbar/
│   │   └── projects/
│   ├── data/
│   │   └── projects.json
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   ├── abstracts/
│   │   ├── base/
│   │   ├── components/
│   │   ├── layout/
│   │   └── main.scss
│   ├── types/
│   │   └── project.ts
│   └── utils/
├── tests/
└── package.json (and other files)
```

### Project Contents

**.github/workflows** - `formatter.yml`, `playwright.yml`

**public/** - Web app manifest, Apple Touch Icon, favicons, open graph image

**src/**

- _**assets/**_ - screenshots from my other works for use in the projects section
- _**components/navbar/**_ - `Navbar.astro`, `NavItem.astro`
- _**components/projects/**_ - `ProjectAction.astro`, `ProjectCard.astro`, `Projects.astro`, `ProjectTag.astro`
- _**components/**_ - `Background.astro`, `BackToTop.astro`, `Contact.astro`, `EmailCopyButton.astro`, `Footer.astro`, `Hero.astro`, `Socials.astro`, `TurnstileWidget.astro`
- _**utils/**_ - `form-utils.ts`, `form-utils.test.ts` (unit test with [Vitest](https://vitest.dev/))

**src/styles/** (based on the [7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern))

- _**abstracts/**_ - `_mixins.scss`, `_variables.scss`
- _**base/**_ - `_base.scss`, `_reset.scss`, `_typography.scss`
- _**components/**_ - `_back-to-top.scss`, `_project-card.scss`, `_socials.scss`
- _**layout/**_ - `_background.scss`, `_contact.scss`, `_footer.scss`, `_hero.scss`, `_navbar.scss`, `_projects.scss`

**tests/** (e2e tests using [Playwright](https://playwright.dev/)) - `back-to-top.spec.ts`, `contact.spec.ts`, `email-copy-button.spec.ts`, `navbar.spec.ts`

## Deployment

This project is deployed in Cloudflare Pages. This repository is connected directly for CI/CD — every push to `main` triggers an automatic build and deploy.

Live site [here](https://jjmta.pages.dev/).

## License

**MIT**
