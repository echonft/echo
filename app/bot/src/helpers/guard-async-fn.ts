import { botLogger } from '@echo/bot/constants/bot-logger'
import { captureException, isInitialized } from '@sentry/node'
import { is, isNil } from 'ramda'

export function guardAsyncFn<TArgs extends unknown[], TResult, TFallbackResult = TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  fallback?: TFallbackResult | ((error: unknown, ...args: TArgs) => Promise<TFallbackResult>)
) {
  return async function (...args: TArgs) {
    try {
      return await fn(...args)
    } catch (e) {
      botLogger.error({ msg: 'guardAsyncFn error', error: e })
      if (isInitialized()) {
        captureException(e)
      }
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
