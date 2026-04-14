import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('contact form validation error feedback', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Send Message' })
    const nameInput = page.getByRole('textbox', { name: 'Name' })
    const emailInput = page.getByRole('textbox', { name: 'Email' })
    const messageInput = page.getByRole('textbox', { name: 'Message' })
    const nameFeedback = page.locator('#name-feedback')
    const emailFeedback = page.locator('#email-feedback')
    const messageFeedback = page.locator('#message-feedback')

    // click submit without filling the form to show validation errors
    await submitButton.click()

    // check that validation error feedback appears for all required fields
    await expect(nameFeedback).toBeVisible()
    await expect(emailFeedback).toBeVisible()
    await expect(messageFeedback).toBeVisible()

    await expect(nameInput).toHaveAttribute('aria-invalid', 'true')
    await expect(emailInput).toHaveAttribute('aria-invalid', 'true')
    await expect(messageInput).toHaveAttribute('aria-invalid', 'true')

    await expect(nameInput).toHaveClass(/-invalid/)
    await expect(emailInput).toHaveClass(/-invalid/)
    await expect(messageInput).toHaveClass(/-invalid/)

    // now fill in the fields with appropriate values
    await nameInput.fill('John Doe')
    await emailInput.fill('john@example.com')
    await messageInput.fill('Hello, this is a test message.')

    // check that validation errors disappear after filling in proper values
    await expect(nameFeedback).toBeHidden()
    await expect(emailFeedback).toBeHidden()
    await expect(messageFeedback).toBeHidden()

    await expect(nameInput).not.toHaveAttribute('aria-invalid')
    await expect(emailInput).not.toHaveAttribute('aria-invalid')
    await expect(messageInput).not.toHaveAttribute('aria-invalid')

    await expect(nameInput).not.toHaveClass(/-invalid/)
    await expect(emailInput).not.toHaveClass(/-invalid/)
    await expect(messageInput).not.toHaveClass(/-invalid/)
  })

  test('contact form submits successfully', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Send Message' })
    const nameInput = page.getByRole('textbox', { name: 'Name' })
    const emailInput = page.getByRole('textbox', { name: 'Email' })
    const messageInput = page.getByRole('textbox', { name: 'Message' })

    // set up a network route to mock the form submission response
    await page.route('**/*', (route) => {
      const request = route.request()
      if (request.method() === 'POST' && request.url().includes('formspree.io')) {
        route.fulfill({
          status: 200, // simulate a successful submission
          contentType: 'application/json',
          body: JSON.stringify({}),
        })
      } else {
        route.continue()
      }
    })

    // fill in the form fields
    await nameInput.fill('John Doe')
    await emailInput.fill('john@example.com')
    await messageInput.fill('Hello, this is a test message.')

    await submitButton.click()

    // check that the success feedback is shown
    await expect(page.locator('.submit-success')).toBeVisible()
  })

  test('contact form submission fails', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Send Message' })
    const nameInput = page.getByRole('textbox', { name: 'Name' })
    const emailInput = page.getByRole('textbox', { name: 'Email' })
    const messageInput = page.getByRole('textbox', { name: 'Message' })

    // set up a network route to mock a failed form submission response
    await page.route('**/*', (route) => {
      const request = route.request()
      if (request.method() === 'POST' && request.url().includes('formspree.io')) {
        route.fulfill({
          status: 400, // simulate a client error (e.g., bad request)
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Bad Request' }),
        })
      } else {
        route.continue()
      }
    })

    // fill in the form fields
    await nameInput.fill('John Doe')
    await emailInput.fill('john@example.com')
    await messageInput.fill('Hello, this is a test message.')

    await submitButton.click()

    // check that the error feedback is shown
    await expect(page.locator('.submit-error')).toBeVisible()
  })
})
