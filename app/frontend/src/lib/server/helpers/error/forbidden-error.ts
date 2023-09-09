import { ErrorStatus } from '../../constants/error-status'
import { ApiError } from './api-error'

export class ForbiddenError extends ApiError {
  constructor(message: string, error?: unknown) {
    super(ErrorStatus.FORBIDDEN, message, error, 'debug')
  }
}
