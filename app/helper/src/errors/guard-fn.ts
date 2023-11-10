import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
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
      logger.debug(`${errorMessage(e)}`)
      captureException(e)
      return fallback
    }
  }
}
