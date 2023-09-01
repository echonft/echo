import { ErrorStatus } from '../../constants/error-status'
import { ApiError } from './api-error'

export class ServerError extends ApiError {
  constructor(message?: string) {
    super(ErrorStatus.SERVER_ERROR, message ?? 'Internal Server Error')
  }
}
