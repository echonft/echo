import { RequestHandler } from '../types/handlers/request-handler'
import { findUserById } from '@echo/firestore'
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
      res.end(res.status(401).json({ error: 'Forbidden' }))
      return Promise.reject('Forbidden')
    }
    // TODO Should be done directly in adapter but works for now
    return findUserById(session.user.id)
      .then((user) => handler(req, res, { ...session, user }))
      .catch(() => {
        res.end(res.status(401).json({ error: 'Forbidden' }))
        return Promise.reject('Forbidden')
      })
  }
}
