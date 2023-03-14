import { NextApiRequest, NextApiResponse } from 'next'
import { ErrorResponse } from 'types/index'

export type RequestHandler<T extends NextApiRequest, U> = (
  req: T,
  res: NextApiResponse<U | ErrorResponse>
) => Promise<void>
