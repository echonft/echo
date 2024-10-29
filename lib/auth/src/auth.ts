import { AuthError } from '@echo/auth/errors/auth-error'
import { error } from '@echo/auth/helpers/logger'
import { userSchema } from '@echo/model/validators/user-schema'
import { apiPathProvider } from '@echo/routing/constants/api-path-provider'
import { pathProvider } from '@echo/routing/constants/path-provider'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import { pathIsNil } from '@echo/utils/helpers/path-is-nil'
import { propIsNil } from '@echo/utils/helpers/prop-is-nil'
import NextAuth, { type NextAuthResult } from 'next-auth'
import Discord, { type DiscordProfile } from 'next-auth/providers/discord'
import { signIn, type SignInResponse, signOut } from 'next-auth/react'
import { andThen, assoc, dissoc, either, isNil, pipe } from 'ramda'

// noinspection JSUnusedGlobalSymbols
const {
  handlers: { GET, POST },
  auth
}: NextAuthResult = NextAuth({
  callbacks: {
    jwt: function ({ token, user }) {
      if (!isNil(user)) {
        return assoc('user', dissoc('id', user), token)
      }
      return token
    },
    session: function (params) {
      const {
        session,
        token: { user }
      } = params
      if (either(propIsNil('token'), pathIsNil(['token', 'user']))(params)) {
        return session
      }
      return assoc('user', user, session)
    }
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    Discord({
      authorization: 'https://discord.com/api/oauth2/authorize?scope=identify',
      profile: async (profile: DiscordProfile, token) => {
        try {
          return await pipe(fetch, andThen(pipe(parseResponse(userSchema), assoc('id', profile.id))))(
            apiPathProvider.user.update.getUrl(),
            {
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify(token)
            }
          )
        } catch (err) {
          error({ err, profile, token }, AuthError.UpdateUser)
          throw err
        }
      }
    })
  ]
})
export { GET, POST, auth }
export function login(): Promise<SignInResponse | undefined> {
  return signIn('discord')
}
export function logout(): Promise<Record<'url', string> | undefined> {
  return signOut({ redirectTo: pathProvider.base.home.getUrl() })
}
