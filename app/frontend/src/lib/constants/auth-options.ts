import { createOrUpdateUser } from '@echo/api'
import { getDiscordAuthorizationUrl, getDiscordConfig } from '@echo/discord'
import { logger } from '@echo/utils'
import { AuthOptions } from 'next-auth'
import Discord from 'next-auth/providers/discord'
import { isNil } from 'ramda'

export const authOptions: AuthOptions = {
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
  callbacks: {
    async jwt({ token, account }) {
      // No firebase token means user is not logged in firebase
      if (account) {
        try {
          const user = await createOrUpdateUser(account.access_token, account.token_type, token.user)
          return { user, ...token }
        } catch (e) {
          logger.error('Auth error: error creating or updating user')
          return token
        }
      }
      return token
    },
    session({ session, token: { user } }) {
      // Should never happen, only for type guarding
      if (isNil(user)) {
        throw Error('Auth error: invalid token data')
      }
      // Inject user in session
      return { ...session, user: user }
    }
  }
}
