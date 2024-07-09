import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import { ServerError } from '@echo/frontend/lib/helpers/error/server-error'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { captureException } from '@sentry/nextjs'
import { isNil } from 'ramda'

export function routeHandlerErrorHandler(args: WithLoggerType<Record<'err', unknown>>) {
  const { err, logger } = args
  logger?.error({ err }, 'could not handle request')
  if (err instanceof ApiError) {
    if (isNil(err.severity)) {
      captureException(err.error)
    } else {
      captureException(err.error, { level: err.severity })
    }
    return err.getErrorResponse()
  } else {
    captureException(err)
    // unknown error
    return new ServerError().getErrorResponse()
  }
}
