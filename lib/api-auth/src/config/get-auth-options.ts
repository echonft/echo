import { discordConfig, getAuthorizationUrl } from '@echo/discord'
import { AuthOptions } from 'next-auth'
import { CallbacksOptions } from 'next-auth/core/types'
import Discord from 'next-auth/providers/discord'

export const getAuthOptions = (callbacks: Partial<CallbacksOptions>): AuthOptions => ({
  providers: [
    Discord({
      clientId: discordConfig.clientId,
      clientSecret: discordConfig.clientSecret,
      authorization: getAuthorizationUrl()
    })
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout'
  },
  // TODO Validate the persistence of session
  callbacks
})
