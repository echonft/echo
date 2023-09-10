import { ErrorStatus } from '../../constants/error-status'
import { ApiError } from './api-error'

export class NotFoundError extends ApiError {
  constructor(message: string, error?: unknown) {
    super(ErrorStatus.NOT_FOUND, message, error, 'debug')
  }
}
