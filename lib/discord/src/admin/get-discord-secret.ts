import type { DiscordSecret } from '@echo-discord/types/discord-secret'
import { isEmpty, isNil } from 'ramda'

export const getDiscordSecret = (): DiscordSecret => {
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
