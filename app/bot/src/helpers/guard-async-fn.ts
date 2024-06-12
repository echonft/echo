import { botLogger } from '@echo/bot/index'
import { captureException, isInitialized } from '@sentry/node'
import { is, isNil } from 'ramda'

export function guardAsyncFn<TArgs extends unknown[], TResult, TFallbackResult = TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  fallback?: TFallbackResult | ((error: unknown, ...args: TArgs) => Promise<TFallbackResult>)
) {
  return async function (...args: TArgs) {
    try {
      return await fn(...args)
    } catch (err) {
      botLogger.error({ err }, 'guardAsyncFn error')
      if (isInitialized()) {
        captureException(err, {
          tags: {
            db_environement: process.env.ENV
          }
        })
      }
      if (isNil(fallback)) {
        return Promise.resolve()
      }
      if (is(Function, fallback)) {
        return fallback(err, ...args)
      }
      return Promise.resolve(fallback)
    }
  }
}
