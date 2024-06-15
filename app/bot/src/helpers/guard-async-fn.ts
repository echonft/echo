import type { ChangeHandler } from '@echo/bot/types/change-handler'
import { captureException, isInitialized } from '@sentry/node'

export function guardAsyncFn<T>(fn: (args: ChangeHandler<T>) => Promise<void>) {
  return async function (args: ChangeHandler<T>) {
    try {
      await fn(args)
      return
    } catch (err) {
      args.logger?.error({ err }, 'guardAsyncFn error')
      if (isInitialized()) {
        captureException(err, {
          tags: {
            app_environement: process.env.ENV
          }
        })
      }
    }
  }
}
