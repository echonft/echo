import type { NonPromise } from '@echo/utils/types/non-promise'
import { captureException, type SeverityLevel } from '@sentry/node'

export function guardFn<TArgs extends unknown[], TResult, TFallbackResult = never>(
  fn: (...args: TArgs) => NonPromise<TResult>,
  fallback: NonPromise<TFallbackResult>,
  severity: SeverityLevel = 'error'
) {
  return function (...args: TArgs) {
    try {
      return fn(...args)
    } catch (e) {
      captureException(e, { level: severity })
      return fallback
    }
  }
}
