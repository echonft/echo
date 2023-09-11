import { ErrorStatus } from '@server/constants/error-status'
import { ApiError } from '@server/helpers/error/api-error'

export class UnauthorizedError extends ApiError {
  constructor(message: string, error?: unknown) {
    super(ErrorStatus.UNAUTHORIZED, message, error, 'debug')
  }
}
