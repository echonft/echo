import { discordConfig, getAuthorizationUrl } from '@echo/discord'
import NextAuth, { AuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

// TODO Should be in {{@echo/api}} but we have a problem exporting
const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: discordConfig.clientId,
      clientSecret: discordConfig.clientSecret,
      authorization: getAuthorizationUrl()
    })
  ]
}
export default NextAuth(authOptions)
