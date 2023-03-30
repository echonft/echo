import { createCustomToken, createOrUpdateUser } from '@echo/api'
import { discordConfig, getAuthorizationUrl } from '@echo/discord'
import NextAuth, { AuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { isNil } from 'ramda'

// TODO Should be in {{@echo/api}} but we have a problem exporting
const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: discordConfig.clientId,
      clientSecret: discordConfig.clientSecret,
      authorization: getAuthorizationUrl()
    })
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout'
  },
  callbacks: {
    async jwt({ token, account }) {
      // No firebase token means user is not logged in firebase
      if (isNil(token.firebaseToken)) {
        // TODO Add claims (roles)
        return createOrUpdateUser(account?.access_token, account?.token_type, token.sub).then(() =>
          createCustomToken(token.sub!).then((firebaseToken) => ({ ...token, firebaseToken }))
        )
      }
      return token
    },
    session({ session, token }) {
      // Send firebaseToken to user
      // TODO: Should this be in the user object?
      return { ...session, firebaseToken: token.firebaseToken as string }
    }
  }
}
export default NextAuth(authOptions)
