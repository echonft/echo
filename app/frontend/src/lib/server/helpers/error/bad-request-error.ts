import { ApiError } from './api-error'
import { ErrorStatus } from '@echo/api-public'

export class BadRequestError extends ApiError {
  constructor(message?: string) {
    super(ErrorStatus.BAD_REQUEST, message ?? 'Bad Request')
  }
}
