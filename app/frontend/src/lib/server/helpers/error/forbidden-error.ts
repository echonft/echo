import { ErrorStatus } from '../../constants/error-status'
import { ApiError } from './api-error'

export class ForbiddenError extends ApiError {
  constructor(message?: string) {
    super(ErrorStatus.FORBIDDEN, message ?? 'Forbidden')
  }
}
