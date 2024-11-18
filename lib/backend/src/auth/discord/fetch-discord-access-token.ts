import { discordAuthTokenResponseSchema } from '@echo/backend/validators/discord-auth-token-response-schema'
import { discordApiRoutes } from '@echo/routing/constants/discord-api-routes'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { Secret } from '@echo/utils/constants/secret'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import { getSecret } from '@echo/utils/services/secret-manager'
import { andThen, pipe, prop } from 'ramda'

export async function fetchDiscordAccessToken(code: string): Promise<string> {
  const clientId = await getSecret(Secret.DiscordClientId)
  const clientSecret = await getSecret(Secret.DiscordClientSecret)
  const redirectUrl = frontendRoutes.login.sign.getUrl()
  const init = {
    method: 'POST',
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUrl,
      scope: 'identify guilds'
    }).toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return pipe(fetch, andThen(pipe(parseResponse(discordAuthTokenResponseSchema), andThen(prop('access_token')))))(
    discordApiRoutes.auth.getToken.getUrl(),
    init
  )
}
