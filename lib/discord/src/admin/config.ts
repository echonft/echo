import { isEmpty, isNil } from 'ramda'

interface DiscordSecret {
  clientToken: string
  clientSecret: string
}

export function discordSecret(): DiscordSecret {
  if (isNil(process.env.DISCORD_CLIENT_TOKEN) || isEmpty(process.env.DISCORD_CLIENT_TOKEN)) {
    throw new Error('.env should contain DISCORD_CLIENT_TOKEN')
  }
  if (isNil(process.env.DISCORD_CLIENT_SECRET) || isEmpty(process.env.DISCORD_CLIENT_SECRET)) {
    throw new Error('.env should contain DISCORD_CLIENT_SECRET')
  }
  return {
    clientToken: process.env.DISCORD_CLIENT_TOKEN,
    clientSecret: process.env.DISCORD_CLIENT_SECRET
  }
}
