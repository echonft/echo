import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { ForbiddenError } from '@echo/frontend/lib/server/helpers/error/forbidden-error'
import { NotFoundError } from '@echo/frontend/lib/server/helpers/error/not-found-error'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import { UnauthorizedError } from '@echo/frontend/lib/server/helpers/error/unauthorized-error'

export function createError(status: ErrorStatus, message?: string) {
  switch (status) {
    case ErrorStatus.BAD_REQUEST:
      return new BadRequestError(message)
    case ErrorStatus.FORBIDDEN:
      return new ForbiddenError(message)
    case ErrorStatus.NOT_FOUND:
      return new NotFoundError(message)
    case ErrorStatus.SERVER_ERROR:
      return new ServerError(message)
    case ErrorStatus.UNAUTHORIZED:
      return new UnauthorizedError(message)
  }
}
