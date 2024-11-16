/* eslint-disable */
import { discordAuthTokenResponseSchema } from '@echo/backend/validators/discord-auth-token-response-schema'
import { apiRoutes } from '@echo/routing/constants/api-routes'
import { Secret } from '@echo/utils/constants/secret'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import { getSecret } from '@echo/utils/services/secret-manager'
import { NextRequest, NextResponse } from 'next/server'
import { andThen, isNil, pipe } from 'ramda'

export function POST(request: NextRequest) {
  console.log('received POST on /api/auth/discord')
  console.log(`code is ${request.nextUrl.searchParams.get('code')}`)
  return NextResponse.json({})
}

export async function GET(request: NextRequest) {
  console.log('received GET on /api/auth/discord')
  const code = request.nextUrl.searchParams.get('code')
  console.log(`code is ${code}`)
  if (isNil(code)) {
    return NextResponse.json({})
  }
  const state = request.nextUrl.searchParams.get('state')
  console.log(`state is ${state}`)
  const clientId = await getSecret(Secret.DiscordClientId)
  const clientSecret = await getSecret(Secret.DiscordClientSecret)
  const redirectUrl = apiRoutes.auth.discord.getUrl()
  const response = await pipe(fetch, andThen(parseResponse(discordAuthTokenResponseSchema)))(
    'https://discord.com/api/v10/oauth2/token',
    {
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
  )
  console.log(`response ${JSON.stringify(response, undefined, 2)}`)
  return NextResponse.json({})
}
