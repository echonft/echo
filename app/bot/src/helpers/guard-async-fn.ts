import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { is, isNil } from 'ramda'

export function guardAsyncFn<TArgs extends unknown[], TResult, TFallbackResult = TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  fallback?: TFallbackResult | ((error: unknown, ...args: TArgs) => Promise<TFallbackResult>)
) {
  return async function (...args: TArgs) {
    try {
      return await fn(...args)
    } catch (e) {
      pinoLogger.error(errorMessage(e))
      if (isNil(fallback)) {
        return Promise.resolve()
      }
      if (is(Function, fallback)) {
        return fallback(e, ...args)
      }
      return Promise.resolve(fallback)
    }
  }
}
