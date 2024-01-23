import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'

export class ServerError extends ApiError {
  constructor(message?: string) {
    super(ErrorStatus.SERVER_ERROR, message ?? 'Server Error')
  }
}
