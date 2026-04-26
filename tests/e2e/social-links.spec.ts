import { test, expect } from '@playwright/test'

test.describe('Social links @smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('x and github social links are valid and not broken', async ({ page }) => {
    const instances = [
      page.locator('.hero-section > .social-links'),
      page.locator('.footer > .social-links'),
    ]

    for (const socialLink of instances) {
      const xLink = socialLink.getByRole('link', { name: 'Visit my X profile' })
      const githubLink = socialLink.getByRole('link', { name: 'Visit my GitHub profile' })

      await expect(xLink).toHaveAttribute('href', 'https://x.com/jjmtazcuetajr')
      await expect(xLink).toHaveAttribute('target', '_blank')
      await expect(xLink).toHaveAttribute('rel', 'noopener noreferrer')

      await expect(githubLink).toHaveAttribute('href', 'https://github.com/jjmtazcuetajr')
      await expect(githubLink).toHaveAttribute('target', '_blank')
      await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })
})
