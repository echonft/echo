import { RequestHandler } from '../types/handlers/request-handler'
import { NextApiRequest } from 'next'
import { AuthOptions, getServerSession } from 'next-auth'
import { isNil } from 'ramda'

export function withSession<T extends NextApiRequest, U>(
  handler: RequestHandler<T, U>,
  authOptions: AuthOptions
): RequestHandler<T, U> {
  return async function (req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (isNil(session)) {
      res.end(res.status(401).json({ error: 'You must be logged in' }))
      throw Error('You must be logged in')
    }
    return handler(req, res, session)
  }
}
