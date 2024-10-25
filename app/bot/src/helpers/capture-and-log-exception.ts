import { captureException, isInitialized } from '@sentry/node'

export function captureAndLogException(err: unknown) {
  if (isInitialized()) {
    captureException(err, {
      tags: {
        app_environement: process.env.ENV
      }
    })
  }
  logger.error({ err })
}
