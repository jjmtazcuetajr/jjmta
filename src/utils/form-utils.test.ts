import { describe, it, expect } from 'vitest'
import { getErrorMessage, normalizeInput } from './form-utils'

describe('getErrorMessage', () => {
  /**
   * Create a required HTMLInputElement for tests.
   * @param type - The input type (e.g. text, email).
   * @param value - The input value to set.
   * @returns A configured required input element.
   */
  function makeInput(type: 'text' | 'email', value: string): HTMLInputElement {
    const input = document.createElement('input')
    input.required = true
    input.type = type
    input.value = value
    return input
  }

  /**
   * Create a required HTMLTextAreaElement for tests.
   * @param value - The textarea value to set.
   * @returns A configured required textarea element.
   */
  function makeTextArea(value: string): HTMLTextAreaElement {
    const textarea = document.createElement('textarea')
    textarea.required = true
    textarea.value = value
    return textarea
  }

  it('returns a validation message when a required input is empty (valueMissing)', () => {
    const input = makeInput('text', '')
    // const input = makeInput('email', '')
    expect(getErrorMessage(input)).toBe(input.validationMessage)
    expect(getErrorMessage(input)).not.toBe('')
  })

  it('returns empty string for a filled-in input', () => {
    const input = makeInput('text', 'hello')
    expect(getErrorMessage(input)).toBe('')
  })

  it('returns a validation message for a type mismatch (e.g. bad email)', () => {
    const input = makeInput('email', 'not-an-email')
    expect(getErrorMessage(input)).toBe(input.validationMessage)
    expect(getErrorMessage(input)).not.toBe('')
  })

  it('returns empty string for a valid email', () => {
    const input = makeInput('email', 'user@example.com')
    expect(getErrorMessage(input)).toBe('')
  })

  it('returns a validation message when a required textarea is empty (valueMissing)', () => {
    const textarea = makeTextArea('')
    expect(getErrorMessage(textarea)).toBe(textarea.validationMessage)
    expect(getErrorMessage(textarea)).not.toBe('')
  })

  it('returns empty string for a filled-in textarea', () => {
    const textarea = makeTextArea('some content')
    expect(getErrorMessage(textarea)).toBe('')
  })
})

describe('normalizeInput', () => {
  it('clears input when its value is only whitespace', () => {
    const input = document.createElement('input')
    input.value = '   '
    normalizeInput(input)
    expect(input.value).toBe('')
  })

  it('trims leading and trailing whitespaces and collapses multiple consecutive spaces in input', () => {
    const input = document.createElement('input')
    input.value = '  hello   world    '
    normalizeInput(input)
    expect(input.value).toBe('hello world')
  })

  it('collapses multiple newlines in textarea', () => {
    const textarea = document.createElement('textarea')
    textarea.value = 'hello\n\n\nworld'
    normalizeInput(textarea)
    expect(textarea.value).toBe('hello\nworld')
  })
})
