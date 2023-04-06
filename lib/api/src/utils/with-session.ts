import { authCallbackOptions } from '../config/auth-callback-options'
import { RequestHandler } from '../types/handlers/request-handler'
import { getAuthOptions } from '@echo/api-auth'
import { NextApiRequest } from 'next'
import { getServerSession } from 'next-auth'
import { isNil } from 'ramda'

export function withSession<T extends NextApiRequest, U>(handler: RequestHandler<T, U>): RequestHandler<T, U> {
  return async function (req, res) {
    const session = await getServerSession(req, res, getAuthOptions(authCallbackOptions))
    if (isNil(session)) {
      res.end(res.status(401).json({ error: 'You must be logged in' }))
      return handler(req, res)
    }
    return handler(req, res, session)
  }
}
