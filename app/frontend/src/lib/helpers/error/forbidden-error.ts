import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'

export class ForbiddenError extends ApiError {
  constructor(message?: string) {
    super(ErrorStatus.FORBIDDEN, message ?? 'Forbidden')
  }
}
