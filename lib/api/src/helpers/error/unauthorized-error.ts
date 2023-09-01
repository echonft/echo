import { ApiError } from './api-error'
import { ErrorStatus } from '@echo/api-public'

export class UnauthorizedError extends ApiError {
  constructor(message?: string) {
    super(ErrorStatus.UNAUTHORIZED, message ?? 'Unauthorized')
  }
}
