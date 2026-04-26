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

    await expect(page.locator('.social-links')).toHaveCount(2)

    for (const socialLink of instances) {
      const linkedinLink = socialLink.getByRole('link', { name: 'Visit my LinkedIn profile' })
      const githubLink = socialLink.getByRole('link', { name: 'Visit my GitHub profile' })

      await expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/jjmtazcueta')
      await expect(linkedinLink).toHaveAttribute('target', '_blank')
      await expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')

      await expect(githubLink).toHaveAttribute('href', 'https://github.com/jjmtazcuetajr')
      await expect(githubLink).toHaveAttribute('target', '_blank')
      await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })
})
