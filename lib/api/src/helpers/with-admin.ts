import { RequestHandler } from '../types/handlers/request-handler'
import { getAdminApiKey } from './auth/get-admin-api-key'
import { NextApiRequest } from 'next'
import { isNil } from 'ramda'

export function withAdmin<T extends NextApiRequest, U>(handler: RequestHandler<T, U>): RequestHandler<T, U> {
  return async function (req, res) {
    if (isNil(req.headers.authorization) || req.headers.authorization !== getAdminApiKey()) {
      res.end(res.status(401).json({ error: 'Admin access restricted' }))
      // FIXME this is not caught
      throw Error('Admin access restricted')
    }
    return handler(req, res)
  }
}
