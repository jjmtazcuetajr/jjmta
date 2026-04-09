import { test, expect } from '@playwright/test'

test.describe('BackToTop Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321')
  })

  test('should hide the back-to-top button initially', async ({ page }) => {
    const backToTopBtn = page.getByRole('button', { name: 'Back to top' })
    await expect(backToTopBtn).toBeHidden()
  })

  test('should show the back-to-top button when scrolled beyond 500px', async ({ page }) => {
    const backToTopBtn = page.getByRole('button', { name: 'Back to top' })
    await expect(backToTopBtn).toBeHidden()
    await page.mouse.wheel(0, 700)
    await expect(backToTopBtn).toBeVisible()
  })

  test('should hide the back-to-top button when scrolled back to top', async ({ page }) => {
    const backToTopBtn = page.getByRole('button', { name: 'Back to top' })
    await expect(backToTopBtn).toBeHidden()

    // first scroll down
    await page.mouse.wheel(0, 700)
    await expect(backToTopBtn).toBeVisible()

    // then scroll back to top
    await page.mouse.wheel(0, -700)
    await expect(backToTopBtn).toBeHidden()
  })

  test('should scroll to top when the back-to-top button is clicked', async ({ page }) => {
    const backToTopBtn = page.getByRole('button', { name: 'Back to top' })
    await expect(backToTopBtn).toBeHidden()

    // scroll down first
    await page.mouse.wheel(0, 700)
    await expect(backToTopBtn).toBeVisible()

    // click the button
    await backToTopBtn.click()

    // check if at the top of the page and button is hidden again
    await expect(async () => {
      const scrollY = await page.evaluate(() => window.pageYOffset)
      expect(scrollY).toBe(0)
    }).toPass()
    await expect(backToTopBtn).toBeHidden()
  })

  test('should have correct accessibility attributes', async ({ page }) => {
    const backToTopBtn = page.getByRole('button', { name: 'Back to top' })
    await page.mouse.wheel(0, 700)
    await expect(backToTopBtn).toBeVisible()
    await expect(backToTopBtn).toHaveAttribute('title', 'Back to top')
    await expect(backToTopBtn).toHaveAttribute('aria-label', 'Back to top')
  })
})
