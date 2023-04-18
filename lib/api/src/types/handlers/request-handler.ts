import { ErrorResponse } from '../../types/models/responses/error-response'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'

export type RequestHandler<T extends NextApiRequest, U> = (
  req: T,
  res: NextApiResponse<U | ErrorResponse>,
  session?: Session
) => Promise<void>
