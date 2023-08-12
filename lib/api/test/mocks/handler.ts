import { RequestHandler } from '../../src/types/handlers/request-handler'
import { NextApiRequest } from 'next'

export const successHandler: RequestHandler<NextApiRequest, object> = (_req, res) =>
  Promise.resolve(res.status(200).json({ message: 'OK' }))
