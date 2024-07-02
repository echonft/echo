import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'

export class UnauthorizedError extends ApiError {
  constructor(error?: Error) {
    super(ErrorStatus.UNAUTHORIZED, 'Unauthorized', error)
  }
}
