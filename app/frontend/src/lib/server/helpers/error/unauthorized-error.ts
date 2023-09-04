import { ErrorStatus } from '../../constants/error-status'
import { ApiError } from './api-error'

export class UnauthorizedError extends ApiError {
  constructor(message?: string) {
    super(ErrorStatus.UNAUTHORIZED, message ?? 'Unauthorized')
  }
}
