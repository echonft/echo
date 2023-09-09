import { ErrorStatus } from '../../constants/error-status'
import { ApiError } from './api-error'

export class UnauthorizedError extends ApiError {
  constructor(message: string, error?: unknown) {
    super(ErrorStatus.UNAUTHORIZED, message, error, 'debug')
  }
}
