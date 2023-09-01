import { ApiError } from './api-error'
import { ErrorStatus } from '@echo/api-public'

export class ServerError extends ApiError {
  constructor(message?: string) {
    super(ErrorStatus.SERVER_ERROR, message ?? 'Internal Server Error')
  }
}
