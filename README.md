# JJMTA

A personal web development portfolio built with Astro, TypeScript, and SCSS, featuring a clean design, responsive layout, and a working contact form.

## About

This is my personal portfolio showcasing my projects and skills as a web developer. Built for performance and simplicity.

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
npm install

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
│   └── types/
└── package.json
```

### Directory Contents

**public/** - Web app manifest, Apple Touch Icon, favicons, robots.txt

**src/**

- _**assets/**_ - screenshots (_.webp_ image files) from my other works for use in the projects section
- _**components/navbar/**_ - astro components that make up the navbar
- _**components/projects/**_ - projects section and the astro components that make up the project cards
- _**components/**_ - patterned background, back-to-top button, hero section, socials, email copy button, contact section, turnstile widget, and footer components
- _**types/**_ - TypeScript interface definitions

**src/styles/** (based on the [7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern))

- _**abstracts/**_ - `_mixins.scss`, `_variables.scss`
- _**base/**_ - `_base.scss`, `_reset.scss`, `_typography.scss`
- _**components/**_ - `_back-to-top.scss`, `_project-card.scss`, `_socials.scss`
- _**layout/**_ - `_background.scss`, `_contacts.scss`, `_footer.scss`, `_hero.scss`, `_navbar.scss`, `_projects.scss`

## Deployment

This project is not yet deployed. When ready, it can be deployed to any static hosting provider (Vercel, Netlify, Cloudflare Pages, etc.) by running `npm run build` and uploading the `./dist/` output.

## License

**MIT**
