import { errorMessage } from '../error/error-message'

/**
 * Wraps an error in a rejected promise
 * @param error
 */
export const toErrorPromise = <T = unknown>(error: Error) => Promise.reject<T>(errorMessage(error))
