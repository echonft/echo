import { getDiscordAuthorizationUrl, getDiscordConfig } from '@echo/discord'
import { AuthOptions } from 'next-auth'
import { CallbacksOptions } from 'next-auth/core/types'
import Discord from 'next-auth/providers/discord'

export const getAuthOptions = (callbacks: Partial<CallbacksOptions>): AuthOptions => {
  const { clientId, clientSecret } = getDiscordConfig()
  return {
    providers: [
      Discord({
        clientId,
        clientSecret,
        authorization: getDiscordAuthorizationUrl()
      })
    ],
    pages: {
      signIn: '/login',
      signOut: '/logout'
    },
    // TODO Validate the persistence of session
    callbacks
  }
}
