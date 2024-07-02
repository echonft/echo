import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'

export class NotFoundError extends ApiError {
  constructor(error?: Error) {
    super(ErrorStatus.NOT_FOUND, 'Not Found', error)
  }
}
