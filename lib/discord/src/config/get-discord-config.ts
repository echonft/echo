import type { DiscordConfig } from '@echo-discord/types/discord-config'
import { isEmpty, isNil } from 'ramda'

export function getDiscordConfig(): DiscordConfig {
  const clientId = process.env.DISCORD_CLIENT_ID
  const redirectUri = process.env.DISCORD_REDIRECT_URI
  const clientSecret = process.env.DISCORD_CLIENT_SECRET
  if (isNil(clientId) || isEmpty(clientId)) {
    throw new Error('.env should contain DISCORD_CLIENT_ID')
  }
  if (isNil(redirectUri) || isEmpty(redirectUri)) {
    throw new Error('.env should contain DISCORD_REDIRECT_URI')
  }
  if (isNil(clientSecret) || isEmpty(clientSecret)) {
    throw new Error('.env should contain DISCORD_CLIENT_SECRET')
  }
  return {
    clientId,
    redirectUri,
    clientSecret,
    oAuthScope: 'identify+guilds'
  }
}
