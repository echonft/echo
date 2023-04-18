import { authCallbackOptions } from '../config/auth-callback-options'
import { RequestHandler } from '../types/handlers/request-handler'
import { getDiscordAuthorizationUrl, getDiscordConfig } from '@echo/discord'
import { NextApiRequest } from 'next'
import { getServerSession } from 'next-auth'
import Discord from 'next-auth/providers/discord'
import { isNil } from 'ramda'

export function withSession<T extends NextApiRequest, U>(handler: RequestHandler<T, U>): RequestHandler<T, U> {
  return async function (req, res) {
    const session = await getServerSession(req, res, {
      providers: [
        Discord({
          clientId: getDiscordConfig().clientId,
          clientSecret: getDiscordConfig().clientSecret,
          authorization: getDiscordAuthorizationUrl()
        })
      ],
      pages: {
        signIn: '/login',
        signOut: '/logout'
      },
      // TODO Validate the persistence of session
      callbacks: authCallbackOptions
    })
    if (isNil(session)) {
      res.end(res.status(401).json({ error: 'You must be logged in' }))
      throw Error('You must be logged in')
    }
    return handler(req, res, session)
  }
}
