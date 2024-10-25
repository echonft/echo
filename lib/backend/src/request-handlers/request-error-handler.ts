import { ApiError } from '@echo/backend/errors/api-error'
import { ServerError } from '@echo/backend/errors/server-error'
import { captureError } from '@echo/backend/helpers/capture-error'
import { error } from '@echo/backend/helpers/logger'
import { captureException } from '@sentry/nextjs'

export function requestErrorHandler(err: unknown) {
  error({ err }, 'could not handle request')
  if (err instanceof ApiError) {
    captureError(err, err.severity)
    return err.getErrorResponse()
  } else {
    captureException(err)
    // unknown error
    return new ServerError().getErrorResponse()
  }
}
