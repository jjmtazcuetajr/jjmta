import eslintPluginAstro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'

export default [
  // Base TypeScript config
  ...tseslint.configs.recommended,

  // Astro recommended config
  ...eslintPluginAstro.configs.recommended,

  // Astro files
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: eslintPluginAstro.parser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
        project: './tsconfig.json',
      },
    },
    rules: {
      // Astro-specific best practices
      'astro/no-conflict-set-directives': 'error',
      'astro/no-unused-define-vars-in-style': 'error',
      'astro/no-deprecated-astro-canonicalurl': 'error',
      'astro/no-deprecated-astro-fetchcontent': 'error',
      'astro/no-deprecated-astro-resolve': 'error',
      'astro/valid-compile': 'error',
    },
  },

  // Ignore patterns
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
]
