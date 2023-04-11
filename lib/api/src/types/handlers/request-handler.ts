import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { ErrorResponse } from 'types/index'

export type RequestHandler<T extends NextApiRequest, U> = (
  req: T,
  res: NextApiResponse<U | ErrorResponse>,
  session?: Session
) => Promise<void>
