import { ErrorStatus } from '@server/constants/error-status'
import { ApiError } from '@server/helpers/error/api-error'

export class ForbiddenError extends ApiError {
  constructor(message: string, error?: unknown) {
    super(ErrorStatus.FORBIDDEN, message, error, 'debug')
  }
}
