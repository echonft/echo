import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import { isPathSecure } from '@echo/api/routing/is-path-secure'
import { mapUser } from '@echo/frontend/lib/auth/map-user'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { getSecret } from '@echo/utils/services/secret-manager'
import { type NextAuthConfig } from 'next-auth'
import Discord, { type DiscordProfile } from 'next-auth/providers/discord'
import { assoc, both, complement, dissoc, either, isNil, path, pipe } from 'ramda'

export const authConfig: NextAuthConfig = {
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
      clientId: await getSecret('DISCORD_CLIENT_ID'),
      clientSecret: await getSecret('DISCORD_CLIENT_SECRET'),
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
}
