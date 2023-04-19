import { DiscordSecret } from '../types/admin/discord-secret'
import { isEmpty, isNil } from 'ramda'

export function getDiscordSecret(): DiscordSecret {
  const clientToken = process.env.DISCORD_CLIENT_TOKEN
  const clientSecret = process.env.DISCORD_CLIENT_SECRET
  if (isNil(clientToken) || isEmpty(clientToken)) {
    throw new Error('.env should contain DISCORD_CLIENT_TOKEN')
  }
  if (isNil(clientSecret) || isEmpty(clientSecret)) {
    throw new Error('.env should contain DISCORD_CLIENT_SECRET')
  }
  return {
    clientToken,
    clientSecret
  }
}
