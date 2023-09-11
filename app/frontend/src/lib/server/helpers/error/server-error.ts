import { ErrorStatus } from '@server/constants/error-status'
import { ApiError } from '@server/helpers/error/api-error'

export class ServerError extends ApiError {
  constructor(message: string, error: unknown) {
    super(ErrorStatus.SERVER_ERROR, message, error)
  }
}
