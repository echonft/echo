import { ErrorStatus } from '../../constants/error-status'
import { ApiError } from './api-error'

export class ServerError extends ApiError {
  constructor(message: string, error: unknown) {
    super(ErrorStatus.SERVER_ERROR, message, error)
  }
}
