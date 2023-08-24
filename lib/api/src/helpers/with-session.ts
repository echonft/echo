import { RequestHandler } from '../types/handlers/request-handler'
import { findUserById, User } from '@echo/firestore'
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
      throw Error('Forbidden')
    }
    // TODO Should be done directly in adapter but works for now
    let user: User | undefined
    try {
      user = await findUserById(session.user.id)
    } catch (e) {
      res.end(res.status(500).json({ error: 'Error fetching user' }))
      throw Error('Error fetching user')
    }
    if (isNil(user)) {
      res.end(res.status(401).json({ error: 'Forbidden' }))
      throw Error('Forbidden')
    }
    return handler(req, res, { ...session, user })
  }
}
