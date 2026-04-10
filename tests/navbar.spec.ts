import { test, expect } from '@playwright/test'

declare global {
  interface Window {
    onSecondLinkActive: () => void
  }
}

test.describe('Navbar Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // wait for the page to load and sections to be present
    await page.waitForSelector('section#home')
    await page.waitForSelector('section#projects')
    await page.waitForSelector('section#contact')
  })

  test('initially highlights home nav item', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: 'home' })
    await expect(homeLink).toHaveClass(/-active/)
  })

  test('highlights projects nav item when scrolled to projects section', async ({ page }) => {
    const projectsSection = page.locator('section#projects')
    await projectsSection.scrollIntoViewIfNeeded()
    // wait for intersection observer to trigger
    await page.waitForTimeout(100) // allow time for observer
    const projectsLink = page.getByRole('link', { name: 'projects' })
    await expect(projectsLink).toHaveClass(/-active/)
  })

  test('highlights contact nav item when scrolled to contact section', async ({ page }) => {
    const contactSection = page.locator('section#contact')
    await contactSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(100)
    const contactLink = page.getByRole('link', { name: 'contact' })
    await expect(contactLink).toHaveClass(/-active/)
  })

  test('clicking nav link highlights it immediately', async ({ page }) => {
    const projectsLink = page.getByRole('link', { name: 'projects' })
    await projectsLink.click()
    await expect(projectsLink).toHaveClass(/-active/)
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

    // Wait long enough for scroll + observer re-enable (> 1000ms timeout in the script)
    await page.waitForTimeout(1500)

    expect(secondLinkBecameActive).toBe(false)
    await expect(contactLink).toHaveClass(/-active/)
  })

  test('scrolling back to previous section updates highlight', async ({ page }) => {
    // Scroll to contact
    const contactSection = page.locator('section#contact')
    await contactSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(100)
    const contactLink = page.getByRole('link', { name: 'contact' })
    await expect(contactLink).toHaveClass(/-active/)

    // Scroll back to projects
    const projectsSection = page.locator('section#projects')
    await projectsSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(100)
    const projectsLink = page.getByRole('link', { name: 'projects' })
    await expect(projectsLink).toHaveClass(/-active/)
  })

  test('rapid scrolling maintains correct highlight', async ({ page }) => {
    // Scroll quickly between sections
    const homeSection = page.locator('section#home')
    const projectsSection = page.locator('section#projects')
    const contactSection = page.locator('section#contact')

    await contactSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(50)
    await expect(page.getByRole('link', { name: 'contact' })).toHaveClass(/-active/)

    await projectsSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(50)
    await expect(page.getByRole('link', { name: 'projects' })).toHaveClass(/-active/)

    await homeSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(50)
    await expect(page.getByRole('link', { name: 'home' })).toHaveClass(/-active/)
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
