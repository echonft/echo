import { errorMessage } from '@echo/utils/helpers/error-message'
import { is, isNil } from 'ramda'

type NonPromise<T> = T extends Promise<unknown> ? never : T

interface GuardFnArgs<TArgs extends unknown[], TResult, TFallbackResult> {
  fn: (...fnArgs: TArgs) => NonPromise<TResult>
  fallback?: NonPromise<TFallbackResult>
  message?: string | ((err: unknown) => string)
}

interface GuardAsyncFnArgs<TArgs extends unknown[], TResult, TFallbackResult> {
  fn: (...fnArgs: TArgs) => Promise<TResult>
  fallback?: Promise<TFallbackResult>
  message?: string | ((err: unknown) => string)
}

export function guardFn<TArgs extends unknown[], TResult, TFallbackResult = TResult>(
  args: GuardFnArgs<TArgs, TResult, TFallbackResult>
) {
  return function (...fnArgs: TArgs): NonPromise<TResult | TFallbackResult> | undefined {
    const { fn, fallback, message } = args
    try {
      return fn.call(fn, ...fnArgs)
    } catch (e) {
      console.error(`error excuting ${fn.name}: ${errorMessage(e)}`)
      if (!isNil(message)) {
        if (is(String, message)) {
          console.error(`message`)
        } else {
          console.error(message(e))
        }
      }
      return fallback
    }
  }
}

export function guardAsyncFn<TArgs extends unknown[], TResult, TFallbackResult = TResult>(
  args: GuardAsyncFnArgs<TArgs, TResult, TFallbackResult>
) {
  return async function (...fnArgs: TArgs): Promise<TResult | TFallbackResult | undefined> {
    const { fn, fallback, message } = args
    try {
      return await fn.call(fn, ...fnArgs)
    } catch (e) {
      console.error(`error excuting ${fn.name}: ${errorMessage(e)}`)
      if (!isNil(message)) {
        if (is(String, message)) {
          console.error(`message`)
        } else {
          console.error(message(e))
        }
      }
      return fallback
    }
  }
}
