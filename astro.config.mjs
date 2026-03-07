// @ts-check
import { defineConfig, envField } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PUBLIC_FORMSPREE_ENDPOINT: envField.string({ context: 'client', access: 'public' }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public' }),
    },
  },
})
