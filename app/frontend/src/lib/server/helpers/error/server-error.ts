import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'

export class ServerError extends ApiError {
  constructor(message: string, error: unknown) {
    super(ErrorStatus.SERVER_ERROR, message, error)
  }
}
