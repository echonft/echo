import { ApiResponse, ErrorResponse } from '@echo/api-public'

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }

  endResponse(res: ApiResponse<ErrorResponse>) {
    res.end(res.status(this.status).json({ error: this.message }))
  }
}
