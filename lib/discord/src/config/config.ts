import { isEmpty, isNil } from 'ramda'

interface DiscordConfig {
  clientId: string
  redirectUri: string
  guildId?: string
}

export function discordConfig(): DiscordConfig {
  if (isNil(process.env.DISCORD_CLIENT_ID) || isEmpty(process.env.DISCORD_CLIENT_ID)) {
    throw new Error('.env should contain DISCORD_CLIENT_ID')
  }
  if (isNil(process.env.DISCORD_REDIRECT_URI) || isEmpty(process.env.DISCORD_REDIRECT_URI)) {
    throw new Error('.env should contain DISCORD_REDIRECT_URI')
  }
  return {
    clientId: process.env.DISCORD_CLIENT_ID,
    redirectUri: process.env.DISCORD_REDIRECT_URI,
    guildId: process.env.DISCORD_GUILD_ID
  }
}
