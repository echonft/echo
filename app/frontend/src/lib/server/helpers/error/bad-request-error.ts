import { ErrorStatus } from '../../constants/error-status'
import { ApiError } from './api-error'

export class BadRequestError extends ApiError {
  constructor(message?: string) {
    super(ErrorStatus.BAD_REQUEST, message ?? 'Bad Request')
  }
}
