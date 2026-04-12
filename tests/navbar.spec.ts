import { test, expect } from '@playwright/test'

declare global {
  interface Window {
    onSecondLinkActive: () => void
  }
}

test.describe('Navbar Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('initially highlights home nav item', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: 'home' })
    await expect(homeLink).toHaveClass(/-active/)
  })

  test('highlights projects nav item when scrolled to projects section', async ({ page }) => {
    const projectsSection = page.locator('section#projects')
    await projectsSection.scrollIntoViewIfNeeded()
    const projectsLink = page.getByRole('link', { name: 'projects' })
    await expect(projectsLink).toHaveClass(/-active/)
  })

  test('highlights contact nav item when scrolled to contact section', async ({ page }) => {
    const contactSection = page.locator('section#contact')
    await contactSection.scrollIntoViewIfNeeded()
    const contactLink = page.getByRole('link', { name: 'contact' })
    await expect(contactLink).toHaveClass(/-active/)
  })

  test('clicking nav link highlights it immediately', async ({ page }) => {
    const projectsLink = page.getByRole('link', { name: 'projects' })
    const contactLink = page.getByRole('link', { name: 'contact' })
    await projectsLink.click()
    await expect(projectsLink).toHaveClass(/-active/)
    await contactLink.click()
    await expect(contactLink).toHaveClass(/-active/)
  })

  test('clicking third nav item (contact) highlights it immediately without highlighting the second (projects)', async ({
    page,
  }) => {
    const homeLink = page.getByRole('link', { name: 'home' })
    const projectsLink = page.getByRole('link', { name: 'projects' })
    const contactLink = page.getByRole('link', { name: 'contact' })

    // click the third nav item
    await contactLink.click()

    // second item should never have been active
    await expect(projectsLink).not.toHaveClass(/-active/)

    // third item should be active immediately after click
    await expect(contactLink).toHaveClass(/-active/)

    // first item should no longer be active
    await expect(homeLink).not.toHaveClass(/-active/)
  })

  test('second nav item (projects) is never transiently highlighted during scroll to third section after clicking the third nav item (contact)', async ({
    page,
  }) => {
    const contactLink = page.getByRole('link', { name: 'contact' })

    // track whether the second link (projects) ever becomes active
    let secondLinkBecameActive = false
    await page.exposeFunction('onSecondLinkActive', () => {
      secondLinkBecameActive = true
    })

    // inject a MutationObserver to watch for the second link (projects) getting the "-active" class
    await page.evaluate(() => {
      const navLinks = document.querySelectorAll('nav a[href^="#"]')
      const secondLink = navLinks[1]

      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class' &&
            (mutation.target as Element).classList.contains('-active')
          ) {
            window.onSecondLinkActive()
          }
        })
      })

      mutationObserver.observe(secondLink, { attributes: true })
    })

    await contactLink.click()

    expect(secondLinkBecameActive).toBe(false)
    await expect(contactLink).toHaveClass(/-active/)
  })

  test('rapid scrolling maintains correct highlight', async ({ page }) => {
    // scroll quickly between sections
    const homeSection = page.locator('section#home')
    const projectsSection = page.locator('section#projects')
    const contactSection = page.locator('section#contact')

    await contactSection.scrollIntoViewIfNeeded()
    await expect(page.getByRole('link', { name: 'contact' })).toHaveClass(/-active/)

    await homeSection.scrollIntoViewIfNeeded()
    await expect(page.getByRole('link', { name: 'home' })).toHaveClass(/-active/)

    await projectsSection.scrollIntoViewIfNeeded()
    await expect(page.getByRole('link', { name: 'projects' })).toHaveClass(/-active/)
  })

  test('nav links have correct href attributes', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: 'home' })
    const projectsLink = page.getByRole('link', { name: 'projects' })
    const contactLink = page.getByRole('link', { name: 'contact' })

    await expect(homeLink).toHaveAttribute('href', '#home')
    await expect(projectsLink).toHaveAttribute('href', '#projects')
    await expect(contactLink).toHaveAttribute('href', '#contact')
  })

  test('nav items are visible and accessible', async ({ page }) => {
    const navLinks = page.locator('nav a[href^="#"]')
    await expect(navLinks).toHaveCount(3)
    for (const link of await navLinks.all()) {
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('href')
    }
  })
})
