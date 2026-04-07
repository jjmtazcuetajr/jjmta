import { test, expect, type Locator } from '@playwright/test'

test.describe('BackToTop Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321')
  })

  const waitForTransition = (locator: Locator) =>
    locator.evaluate(
      (el) =>
        new Promise<void>((resolve) => {
          el.addEventListener('transitionend', () => resolve(), { once: true })
        }),
    )

  test('should hide the back-to-top button initially', async ({ page }) => {
    const button = page.locator('.back-to-top')
    await expect(button).not.toHaveClass(/-visible/)

    // check computed styles for opacity and visibility
    const opacity = await button.evaluate((el) => getComputedStyle(el).opacity)
    const visibility = await button.evaluate((el) => getComputedStyle(el).visibility)
    expect(opacity).toBe('0')
    expect(visibility).toBe('hidden')
  })

  test('should show the back-to-top button when scrolled beyond 500px', async ({ page }) => {
    const button = page.locator('.back-to-top')

    // scroll to 700px, then wait for the opacity transition to finish
    await page.evaluate(() => window.scrollTo(0, 700))
    await button.evaluate(
      (el) =>
        new Promise<void>((resolve) => {
          el.addEventListener(
            'transitionend',
            (e) => {
              if ((e as TransitionEvent).propertyName === 'opacity') resolve()
            },
            { once: true },
          )
        }),
    )
    await expect(button).toHaveClass(/-visible/)

    const opacity = await button.evaluate((el) => getComputedStyle(el).opacity)
    const visibility = await button.evaluate((el) => getComputedStyle(el).visibility)
    expect(opacity).toBe('1')
    expect(visibility).toBe('visible')
  })

  test('should hide the back-to-top button when scrolled back to top', async ({ page }) => {
    const button = page.locator('.back-to-top')

    // first scroll down
    await page.evaluate(() => window.scrollTo(0, 700))
    await waitForTransition(button)
    await expect(button).toHaveClass(/-visible/)

    // then scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0))
    await waitForTransition(button)
    await expect(button).not.toHaveClass(/-visible/)

    const opacity = await button.evaluate((el) => getComputedStyle(el).opacity)
    const visibility = await button.evaluate((el) => getComputedStyle(el).visibility)
    expect(opacity).toBe('0')
    expect(visibility).toBe('hidden')
  })

  test('should scroll to top when the back-to-top button is clicked', async ({ page }) => {
    const button = page.locator('.back-to-top')

    // scroll down first
    await page.evaluate(() => window.scrollTo(0, 700))
    await waitForTransition(button)
    await expect(button).toHaveClass(/-visible/)

    // click the button
    await button.click()
    await page.waitForFunction(() => window.scrollY === 0)
    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBe(0)
  })

  test('should have correct accessibility attributes', async ({ page }) => {
    const button = page.locator('.back-to-top')
    await expect(button).toHaveAttribute('title', 'Back to top')
    await expect(button).toHaveAttribute('aria-label', 'Back to top')
    await expect(button).toHaveAttribute('type', 'button')
  })

  test('should handle reduced motion preference', async ({ page }) => {
    // emulate reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const button = page.locator('.back-to-top')

    // verify reduced motion transition properties are applied
    const transitionProperty = await button.evaluate(
      (el) => getComputedStyle(el).transitionProperty,
    )
    // 'translate' should NOT be in the list under reduced motion
    expect(transitionProperty).not.toContain('translate')

    // scroll down
    await page.evaluate(() => window.scrollTo(0, 700))
    await page.waitForTimeout(100)
    await expect(button).toHaveClass(/-visible/)

    // translate should be 0px — no offset applied
    const translate = await button.evaluate((el) => getComputedStyle(el).translate)
    expect(translate).toBe('0px')

    // verify active state does not apply a translate nudge
    await button.hover()
    await button.dispatchEvent('mousedown')
    const activeTransform = await button.evaluate((el) => getComputedStyle(el).translate)
    expect(activeTransform).toBe('0px')
  })
})
