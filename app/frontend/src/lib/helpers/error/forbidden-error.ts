import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'

export class ForbiddenError extends ApiError {
  constructor(error?: Error) {
    super(ErrorStatus.FORBIDDEN, 'Forbidden', error)
  }
}
