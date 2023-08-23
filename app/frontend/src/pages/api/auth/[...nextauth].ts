import { createOrUpdateUser } from '@echo/api'
import { getDiscordAuthorizationUrl, getDiscordConfig } from '@echo/discord'
import { Dayjs } from 'dayjs'
import NextAuth, { AuthOptions } from 'next-auth'
import Discord from 'next-auth/providers/discord'
import { isNil } from 'ramda'

type User = {
  id: string
  discordAvatar: string | undefined
  discordBanner: string | undefined
  discordGuilds: { discordId: string }[]
  discordId: string
  discordUsername: string
  nonce: string | undefined
  updatedAt: Dayjs | undefined
  wallets: { address: string; chainId: number }[]
}
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
