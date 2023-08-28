import { ErrorResponse } from '../responses/error-response'
import { NextApiResponse } from 'next'

export type ApiResponse<T> = NextApiResponse<T | ErrorResponse>
