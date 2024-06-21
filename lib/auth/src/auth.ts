import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import { isPathSecure } from '@echo/api/routing/is-path-secure'
import { linkProvider } from '@echo/api/routing/link-provider'
import { mapUser } from '@echo/auth/map-user'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import NextAuth, { type NextAuthResult } from 'next-auth'
import Discord, { type DiscordProfile } from 'next-auth/providers/discord'
import { assoc, both, complement, dissoc, either, isNil, path, pipe } from 'ramda'

const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
}: NextAuthResult = NextAuth({
  callbacks: {
    authorized: function (params) {
      return complement(
        both(
          pipe(nonNullableReturn(path(['request', 'nextUrl', 'pathname'])), isPathSecure),
          pathIsNil(['auth', 'user'])
        )
      )(params)
    },
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
        await fetch(apiUrlProvider.user.update.getUrl(), {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(token)
        })
        return mapUser(profile)
      }
    })
  ]
})
export { GET, POST }
export { auth }
async function login() {
  await signIn('discord')
}
export { login as signIn }
async function logout() {
  await signOut({ redirectTo: linkProvider.base.home.getUrl() })
}
export { logout as signOut }
