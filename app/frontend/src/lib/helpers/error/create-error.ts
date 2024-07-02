import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { ForbiddenError } from '@echo/frontend/lib/helpers/error/forbidden-error'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import { ServerError } from '@echo/frontend/lib/helpers/error/server-error'
import { UnauthorizedError } from '@echo/frontend/lib/helpers/error/unauthorized-error'

export function createError(status: ErrorStatus, error?: unknown) {
  switch (status) {
    case ErrorStatus.BAD_REQUEST:
      return new BadRequestError(error as Error)
    case ErrorStatus.FORBIDDEN:
      return new ForbiddenError(error as Error)
    case ErrorStatus.NOT_FOUND:
      return new NotFoundError(error as Error)
    case ErrorStatus.SERVER_ERROR:
      return new ServerError(error as Error)
    case ErrorStatus.UNAUTHORIZED:
      return new UnauthorizedError(error as Error)
  }
}
