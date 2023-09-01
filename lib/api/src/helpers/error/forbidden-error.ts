import { ApiError } from './api-error'
import { ErrorStatus } from '@echo/api-public'

export class ForbiddenError extends ApiError {
  constructor(message?: string) {
    super(ErrorStatus.FORBIDDEN, message ?? 'Forbidden')
  }
}
