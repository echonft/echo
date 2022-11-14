import * as dotenv from 'dotenv'
import { isEmpty, isNil } from 'ramda'

dotenv.config()

export interface DiscordConfig {
  clientToken: string
  clientId: string
  clientSecret: string
  redirectUri: string
  guildId?: string
}

export function discordConfig(): DiscordConfig {
  if (isNil(process.env.DISCORD_CLIENT_TOKEN) || isEmpty(process.env.DISCORD_CLIENT_TOKEN)) {
    throw new Error('.env should contain DISCORD_CLIENT_TOKEN')
  }
  if (isNil(process.env.DISCORD_CLIENT_ID) || isEmpty(process.env.DISCORD_CLIENT_ID)) {
    throw new Error('.env should contain DISCORD_CLIENT_ID')
  }
  if (isNil(process.env.DISCORD_CLIENT_SECRET) || isEmpty(process.env.DISCORD_CLIENT_SECRET)) {
    throw new Error('.env should contain DISCORD_CLIENT_SECRET')
  }
  if (isNil(process.env.DISCORD_REDIRECT_URI) || isEmpty(process.env.DISCORD_REDIRECT_URI)) {
    throw new Error('.env should contain DISCORD_REDIRECT_URI')
  }
  return {
    clientToken: process.env.DISCORD_CLIENT_TOKEN,
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    redirectUri: process.env.DISCORD_REDIRECT_URI,
    guildId: process.env.DISCORD_GUILD_ID
  }
}
