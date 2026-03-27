/**
 * Normalizes the value of a text input or textarea element by:
 * - Clearing the field if it only contains whitespace.
 * - Collapsing multiple consecutive spaces into single spaces.
 * - For textareas only: collapsing multiple consecutive newlines into double newlines.
 * - Trimming leading and trailing whitespace.
 *
 * @param element - The text input or textarea element to normalize.
 */
export function normalizeInput(element: HTMLInputElement | HTMLTextAreaElement) {
  const value = element.value
  const isTextarea = element instanceof HTMLTextAreaElement

  let normalized = value

  // trim leading/trailing spaces and newlines
  normalized = normalized.trim()

  if (isTextarea) {
    normalized = normalized
      .split('\n')
      .map((line) => (line.trim() === '' ? '' : line)) // blank out whitespace-only lines
      .join('\n')
      .replace(/\n{3,}/g, '\n\n') // collapse 3+ newlines to max 2 to add a minimal and reasonable visual breathing room
  } else {
    // for text inputs: collapse multiple spaces into one
    normalized = normalized.replace(/\s+/g, ' ')
  }

  element.value = normalized
}

/**
 * Retrieves the validation error message for a given input element.
 *
 * Checks if the input has a missing value or invalid type and returns the browser's
 * built-in validation message. Returns an empty string if the input is valid.
 *
 * @param input - The text input or textarea element to check.
 * @returns The validation message if the input is invalid, or an empty string if valid.
 */
export function getErrorMessage(input: HTMLInputElement | HTMLTextAreaElement): string {
  if (input.validity.valueMissing || input.validity.typeMismatch) return input.validationMessage
  return ''
}
