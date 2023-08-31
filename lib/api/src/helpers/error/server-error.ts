import { ApiError } from './api-error'

export class ServerError extends ApiError {
  constructor(message?: string) {
    super(500, message ?? 'Internal Server Error')
  }
}
