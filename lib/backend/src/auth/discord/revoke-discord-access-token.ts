import { discordApiRoutes } from '@echo/routing/constants/discord-api-routes'
import { Secret } from '@echo/utils/constants/secret'
import { getSecret } from '@echo/utils/services/secret-manager'

export async function revokeDiscordAccessToken(token: string): Promise<Response> {
  const clientId = await getSecret(Secret.DiscordClientId)
  const clientSecret = await getSecret(Secret.DiscordClientSecret)
  const init = {
    method: 'POST',
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      token,
      token_type_hint: 'access_token'
    }).toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return fetch(discordApiRoutes.auth.revoke.getUrl(), init)
}
