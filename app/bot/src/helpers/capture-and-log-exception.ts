import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { captureException, isInitialized } from '@sentry/node'

export function captureAndLogException(logger: Nullable<Logger>) {
  return function (err: unknown) {
    if (isInitialized()) {
      captureException(err, {
        tags: {
          app_environement: process.env.ENV
        }
      })
    }
    logger?.error({ err })
  }
}
