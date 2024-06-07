import { errorMessage } from '@echo/utils/helpers/error-message'
import { is, isNil } from 'ramda'

interface GuardAsyncFnArgs<TArgs extends unknown[], TResult, TFallbackResult> {
  fn: (...fnArgs: TArgs) => Promise<TResult>
  fallback?: Promise<TFallbackResult>
  message?: string | ((err: unknown) => string)
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
