import type { NonPromise } from '@echo/utils/types/non-promise'
import { captureException } from '@sentry/node'

export function guardFn<TArgs extends unknown[], TResult, TFallbackResult = never>(
  fn: (...args: TArgs) => NonPromise<TResult>,
  fallback: NonPromise<TFallbackResult>
) {
  return function (...args: TArgs) {
    try {
      return fn(...args)
    } catch (e) {
      captureException(e)
      return fallback
    }
  }
}
