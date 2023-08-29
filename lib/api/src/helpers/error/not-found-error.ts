import { ApiError } from './api-error'

export class NotFoundError extends ApiError {
  constructor(message?: string) {
    super(404, message ?? 'Not Found')
  }
}
