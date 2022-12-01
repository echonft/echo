import { DiscordConfig } from '../types'
import { isEmpty, isNil } from 'rambda'

export function getDiscordConfig(): DiscordConfig {
  const clientId = process.env.DISCORD_CLIENT_ID
  const redirectUri = process.env.DISCORD_REDIRECT_URI
  if (isNil(clientId) || isEmpty(clientId)) {
    throw new Error('.env should contain DISCORD_CLIENT_ID')
  }
  if (isNil(redirectUri) || isEmpty(redirectUri)) {
    throw new Error('.env should contain DISCORD_REDIRECT_URI')
  }
  return {
    clientId,
    redirectUri,
    guildId: process.env.DISCORD_GUILD_ID
  }
}
