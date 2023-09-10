import { createOrUpdateUser } from '../server/helpers/auth/create-or-update-user'
import { getDiscordAuthorizationUrl, getDiscordConfig } from '@echo/discord'
import { errorMessage, logger } from '@echo/utils'
import { AuthOptions } from 'next-auth'
import Discord from 'next-auth/providers/discord'
import { dissoc, isNil } from 'ramda'

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
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        try {
          const user = await createOrUpdateUser(account.access_token, account.token_type, token.user)
          return { user, ...token }
        } catch (e) {
          logger.error(`Auth error: error creating or updating user: ${errorMessage(e)}`)
          return token
        }
      }
      return token
    },
    session({ session, token: { user } }) {
      if (isNil(user)) {
        logger.error('Auth error: user is nil in session callback')
        return dissoc('user', session)
      }
      return { ...session, user }
    }
  }
}
