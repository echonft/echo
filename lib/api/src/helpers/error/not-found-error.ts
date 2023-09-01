import { ApiError } from './api-error'
import { ErrorStatus } from '@echo/api-public'

export class NotFoundError extends ApiError {
  constructor(message?: string) {
    super(ErrorStatus.NOT_FOUND, message ?? 'Not Found')
  }
}
