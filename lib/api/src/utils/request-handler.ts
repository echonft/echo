import { NextApiRequest, NextApiResponse } from 'next'
import { ErrorResponse } from 'types'

export declare type RequestHandler<T extends NextApiRequest, U> = (
  req: T,
  res: NextApiResponse<U | ErrorResponse>
) => Promise<NextApiResponse<U | ErrorResponse>> | unknown
