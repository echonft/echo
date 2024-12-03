import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { Environment, environment } from '@echo/utils/constants/environment'
import { stringify } from 'qs'
import { concat } from 'ramda'

export function discordOAuthUrl(): string {
  const baseUrl = 'https://discord.com/oauth2/authorize'
  const clientId = environment() === Environment.Development ? '1022253427436298250' : '1224786309009113259'
  const redirectUrl = frontendRoutes.login.sign.getUrl()
  const query = stringify(
    {
      client_id: clientId,
      redirect_uri: redirectUrl,
      response_type: 'code',
      scope: 'identify'
    },
    {
      addQueryPrefix: true
    }
  )
  return concat(baseUrl, query)
}
