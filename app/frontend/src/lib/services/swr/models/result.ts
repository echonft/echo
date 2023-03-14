export type SwrResult<Data, Meta = undefined> = Result<Data, Meta> | undefined

// FIXME find a way so data is not optional
export interface Result<Data, Meta = undefined> {
  successful: boolean
  data?: Data
  message?: string
  meta?: Meta | undefined
}

/**
 * Generate a successful Result object
 * @param data The data object
 * @param meta Any extra data
 * @return Result A result object with successful = true
 */
export function successfulResult<Data, Meta extends Record<string, unknown> | undefined = undefined>(
  data: Data,
  meta?: Meta
): Result<Data, Meta> {
  return { successful: true, data, meta, message: undefined }
}

/**
 * Generate a failure Result object
 * @param message Error message
 * @return Result A result object with successful = false
 */
export function failureResult<Data>(message?: string): Result<Data> {
  return { successful: false, data: undefined, message: message ?? 'Failed' }
}
