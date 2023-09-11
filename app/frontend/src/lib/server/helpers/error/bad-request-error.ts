import { ErrorStatus } from '@server/constants/error-status'
import { ApiError } from '@server/helpers/error/api-error'

export class BadRequestError extends ApiError {
  constructor(message: string, error?: unknown) {
    super(ErrorStatus.BAD_REQUEST, message, error, 'warn')
  }
}
