import { ErrorResponse } from '../models/error-response'
import { NextApiRequest, NextApiResponse } from 'next'

export declare type RequestHandler<T extends NextApiRequest, U> = (
  req: T,
  res: NextApiResponse<U | ErrorResponse>
) => Promise<NextApiResponse<U | ErrorResponse>> | unknown
