import { ApiError } from './api-error'
import { ErrorResponse } from '@echo/api-public'
import { NextApiResponse } from 'next'
import { HTTP_METHOD } from 'next/dist/server/web/http'

export class MethodNotAllowedError extends ApiError {
  allowedMethods: HTTP_METHOD[]

  constructor(allowedMethods: HTTP_METHOD[]) {
    super(405, 'Method Not Allowed')
    this.allowedMethods = allowedMethods
  }

  endResponse(res: NextApiResponse<ErrorResponse>) {
    res.setHeader('Allow', this.allowedMethods)
    super.endResponse(res)
  }
}
