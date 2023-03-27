import { createCustomToken } from '@echo/api'
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
  callbacks: {
    async jwt({ token }) {
      if (isNil(token.firebaseToken) && !isNil(token.sub)) {
        return createCustomToken(token.sub).then((firebaseToken) => ({ firebaseToken, ...token }))
      }
      return token
    }
  }
}
export default NextAuth(authOptions)
