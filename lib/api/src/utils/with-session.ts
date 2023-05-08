import { RequestHandler } from '../types/handlers/request-handler'
import { findUserById } from '@echo/firebase-admin'
import { R } from '@mobily/ts-belt'
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
      // FIXME this is not caught
      throw Error('You must be logged in')
    }
    // TODO Should be done directly in adapter but works for now
    const userResult = await findUserById(session.user.id)
    if (R.isError(userResult)) {
      res.end(res.status(401).json({ error: 'You must be logged in' }))
      // FIXME this is not caught
      throw Error('You must be logged in')
    }
    return handler(req, res, { ...session, user: R.getExn(userResult) })
  }
}
