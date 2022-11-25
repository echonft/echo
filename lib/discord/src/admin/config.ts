import { isEmpty, isNil } from 'rambda'

interface DiscordSecret {
  clientToken: string
  clientSecret: string
}

function getDiscordSecret(): DiscordSecret {
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

export const discordSecret = getDiscordSecret()
