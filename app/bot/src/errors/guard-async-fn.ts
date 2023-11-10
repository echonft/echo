import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { captureException, type SeverityLevel } from '@sentry/node'

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
