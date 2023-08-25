import { ErrorResponse } from '@echo/api-public'
import { NextApiResponse } from 'next'

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }

  endResponse(res: NextApiResponse<ErrorResponse>) {
    res.end(res.status(this.status).json({ error: this.message }))
  }
}
