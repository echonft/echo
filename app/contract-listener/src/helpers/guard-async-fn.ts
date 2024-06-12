import type { WithLogger } from '@echo/utils/types/with-logger'

interface GuardAsyncFnArgs<TArgs extends unknown[], TResult> extends WithLogger {
  fn: (...fnArgs: TArgs) => Promise<TResult>
}

export function guardAsyncFn<TArgs extends unknown[], TResult>(args: GuardAsyncFnArgs<TArgs, TResult>) {
  return async function (...fnArgs: TArgs): Promise<TResult | undefined> {
    const { fn, logger } = args
    try {
      return await fn.call(fn, ...fnArgs)
    } catch (err) {
      logger?.error({ fn: fn.name, err }, 'error excuting function')
      return
    }
  }
}
