import { captureError } from '@echo/frontend/lib/helpers/capture-error'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import { ServerError } from '@echo/frontend/lib/helpers/error/server-error'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { captureException } from '@sentry/nextjs'

export function requestErrorHandler(args: WithLoggerType<Record<'err', unknown>>) {
  const { err, logger } = args
  logger?.error({ err }, 'could not handle request')
  if (err instanceof ApiError) {
    captureError(err, err.severity)
    return err.getErrorResponse()
  } else {
    captureException(err)
    // unknown error
    return new ServerError().getErrorResponse()
  }
}
