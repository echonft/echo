import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { captureException } from '@sentry/node'

type SeverityLevel = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug'
type NonPromise<T> = T extends Promise<unknown> ? never : T

export function guardFn<TArgs extends unknown[], TResult, TFallbackResult = never>(
  fn: (...args: TArgs) => NonPromise<TResult>,
  fallback: NonPromise<TFallbackResult>,
  severity: SeverityLevel = 'error'
) {
  return function (...args: TArgs) {
    try {
      return fn(...args)
    } catch (e) {
      logger.debug(`${errorMessage(e)}`)
      captureException(e, { level: severity })
      return fallback
    }
  }
}

export function guardAsyncFn<TArgs extends unknown[], TResult, TFallbackResult = never>(
  fn: (...args: TArgs) => Promise<TResult>,
  fallback: TFallbackResult,
  severity: SeverityLevel = 'error'
) {
  return async function (...args: TArgs) {
    try {
      return await fn(...args)
    } catch (e) {
      logger.debug(`${errorMessage(e)}`)
      captureException(e, { level: severity })
      return fallback
    }
  }
}
