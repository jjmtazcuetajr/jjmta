/**
 * Normalizes the value of a text input or textarea element by:
 * - Clearing the field if it only contains whitespace.
 * - Collapsing multiple consecutive spaces into single spaces.
 * - For textareas only: collapsing multiple consecutive newlines into single newlines.
 * - Trimming leading and trailing whitespace.
 *
 * @param element - The text input or textarea element to normalize.
 */
export function normalizeInput(element: HTMLInputElement | HTMLTextAreaElement) {
  const value = element.value
  const isTextarea = element instanceof HTMLTextAreaElement

  // if only whitespace characters (spaces and/or newlines), clear the text field
  if (/^\s*$/.test(value)) {
    element.value = ''
    return
  }

  let normalized = value

  if (isTextarea) {
    // normalize each line: collapse multiple spaces into one
    normalized = normalized
      .split('\n')
      .map((line) => line.replace(/ +/g, ' '))
      .join('\n')

    // collapse multiple consecutive newlines into one
    normalized = normalized.replace(/\n{2,}/g, '\n')
  } else {
    // for text inputs: collapse multiple spaces into one
    normalized = normalized.replace(/ +/g, ' ')
  }

  // trim leading/trailing spaces and newlines
  normalized = normalized.trim()

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
