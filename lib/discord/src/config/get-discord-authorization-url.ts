import { getDiscordConfig } from './get-discord-config'

export function getDiscordAuthorizationUrl(): string {
  return `https://discord.com/api/oauth2/authorize?scope=${getDiscordConfig().oAuthScope}`
}
