import { type DiscordConfig } from '@echo/discord/types/discord-config'
import { isEmpty, isNil } from 'ramda'

export function getDiscordConfig(): DiscordConfig {
  const clientId = process.env.DISCORD_CLIENT_ID
  const clientSecret = process.env.DISCORD_CLIENT_SECRET
  if (isNil(clientId) || isEmpty(clientId)) {
    throw new Error('.env should contain DISCORD_CLIENT_ID')
  }
  if (isNil(clientSecret) || isEmpty(clientSecret)) {
    throw new Error('.env should contain DISCORD_CLIENT_SECRET')
  }
  return {
    clientId,
    clientSecret,
    authorization: 'https://discord.com/api/oauth2/authorize?scope=identify'
  }
}
