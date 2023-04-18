import { authCallbackOptions } from '@echo/api'
import { getDiscordAuthorizationUrl, getDiscordConfig } from '@echo/discord'
import NextAuth from 'next-auth'
import Discord from 'next-auth/providers/discord'

export default NextAuth({
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
  callbacks: authCallbackOptions
})
