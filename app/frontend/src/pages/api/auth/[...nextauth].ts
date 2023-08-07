import { createOrUpdateUser } from '@echo/api'
import { getDiscordAuthorizationUrl, getDiscordConfig } from '@echo/discord'
import { User } from '@echo/model'
import NextAuth, { AuthOptions } from 'next-auth'
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
        return createOrUpdateUser(account.access_token, account.token_type, token.sub)
          .then((user) => {
            return { ...token, user }
          })
          .catch(() => {
            throw Error('Auth error: error creating or updating user')
          })
      }
      return token
    },
    session({ session, token: { user } }) {
      // Should never happen, only for type guarding
      if (isNil(user)) {
        throw Error('Auth error: invalid token data')
      }
      // Inject user in session
      // TODO Not sure if casting like this here makes sense
      return { ...session, user: user as User }
    }
  }
}

export default NextAuth(authOptions)
