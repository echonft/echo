export type SwrResult<T> = Result<T> | undefined

export interface Result<T> {
  successful: boolean
  data?: T
  message?: string
  // TODO Add generics with this, not sure if needed for now
  meta?: any
}

/**
 * Generate a successful Result object
 * @param data The data object
 * @param meta Any extra data
 * @return Result A result object with successful = true
 */
export function successfulResult<T>(data?: T, meta?: any): Result<T> {
  return { successful: true, data: data, meta: meta, message: undefined }
}

/**
 * Generate a failure Result object
 * @param message Error message
 * @return Result A result object with successful = false
 */
export function failureResult<T>(message?: string): Result<T> {
  return { successful: false, data: undefined, message: message ?? 'Failed' }
}
