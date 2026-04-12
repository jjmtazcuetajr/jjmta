import { test, expect } from '@playwright/test'

test.describe('Email Copy Button', () => {
  test.beforeEach(async ({ page, context, browserName }) => {
    if (browserName === 'chromium') {
      // this condition is needed because clipboard permissions are only supported in Chromium browsers
      // firefox and webkit will ignore the clipboard permission grant and just work without it
      await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    }
    await page.goto('/')
  })

  test('copies email to clipboard, shows tooltip, and changes icon', async ({
    page,
    browserName,
  }) => {
    const components = page.locator('email-copy-button')
    const emailCopyButtons = await components.all()

    for (const emailCopyButton of emailCopyButtons) {
      const button = emailCopyButton.locator('button')
      const tooltip = emailCopyButton.locator('.tooltip')
      const emailIcon = button.locator('.email-icon')
      const checkIcon = button.locator('.check-icon')

      // initial state
      await expect(button).not.toHaveClass(/-copied/)
      await expect(tooltip).not.toHaveClass(/-visible/)
      await expect(tooltip).toBeHidden()
      await expect(emailIcon).toHaveCSS('opacity', '1')
      await expect(checkIcon).toHaveCSS('opacity', '0')

      await button.click()

      // check clipboard
      if (browserName === 'chromium' || browserName === 'firefox') {
        // this condition is needed because WebKit doesn't allow clipboard reads from arbitrary JavaScript contexts
        const clipboardText = await page.evaluate(() => navigator.clipboard.readText())
        expect(clipboardText).toBe('azcuetajjmt@gmail.com')
      }

      // check tooltip appears
      await expect(tooltip).toHaveClass(/-visible/)
      await expect(tooltip).toHaveText('Email copied!')
      await expect(tooltip).toBeVisible()

      // check button state
      await expect(button).toHaveClass(/-copied/)
      await expect(button).toHaveAttribute('aria-label', 'Email copied!')

      // check icons
      await expect(emailIcon).toHaveCSS('opacity', '0')
      await expect(checkIcon).toHaveCSS('opacity', '1')

      // check tooltip hidden
      await expect(tooltip).not.toHaveClass(/-visible/)
      await expect(tooltip).toBeHidden()

      // check button reverted
      await expect(button).not.toHaveClass(/-copied/)
      await expect(button).toHaveAttribute('aria-label', 'Copy email address to clipboard')

      // check icons reverted
      await expect(emailIcon).toHaveCSS('opacity', '1')
      await expect(checkIcon).toHaveCSS('opacity', '0')
    }
  })
})
