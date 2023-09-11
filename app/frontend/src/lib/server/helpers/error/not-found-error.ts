import { ErrorStatus } from '@server/constants/error-status'
import { ApiError } from '@server/helpers/error/api-error'

export class NotFoundError extends ApiError {
  constructor(message: string, error?: unknown) {
    super(ErrorStatus.NOT_FOUND, message, error, 'debug')
  }
}
