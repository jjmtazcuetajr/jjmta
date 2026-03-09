interface ErrorDetails {
  code: string
  field: string
  message: string
}

export interface FormspreeError {
  error: string
  errors: ErrorDetails[]
}
