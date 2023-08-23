import { ApiError } from './api-error'
import { ErrorResponse } from '@echo/api-public'
import { NextApiResponse } from 'next'

export function endResponseOnApiError(error: unknown, res: NextApiResponse<ErrorResponse>) {
  const { status, message } = error as ApiError
  res.end(res.status(status).json({ error: message }))
}
