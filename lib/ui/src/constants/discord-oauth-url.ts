import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { stringify } from 'qs'
import { concat } from 'ramda'

export function discordOAuthUrl(discordClientId: string): string {
  const baseUrl = 'https://discord.com/oauth2/authorize'
  const redirectUrl = frontendRoutes.login.sign.getUrl()
  const query = stringify(
    {
      client_id: discordClientId,
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
