import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { is, isNil } from 'ramda'

interface GuardAsyncFnArgs<TArgs extends unknown[], TResult, TFallbackResult> {
  fn: (...fnArgs: TArgs) => Promise<TResult>
  fallback?: Promise<TFallbackResult>
  message?: string | ((err: unknown) => string)
}

export function guardAsyncFn<TArgs extends unknown[], TResult, TFallbackResult = TResult>(
  args: GuardAsyncFnArgs<TArgs, TResult, TFallbackResult>
) {
  return async function (logger: Nullable<Logger>, ...fnArgs: TArgs): Promise<TResult | TFallbackResult | undefined> {
    const { fn, fallback, message } = args
    try {
      return await fn.call(fn, ...fnArgs)
    } catch (err) {
      logger?.error({ fn: fn.name, err }, 'error excuting function')
      if (!isNil(message)) {
        if (is(String, message)) {
          logger?.error({ fn: fn.name }, message)
        } else {
          logger?.error({ fn: fn.name }, message(err))
        }
      }
      return fallback
    }
  }
}
