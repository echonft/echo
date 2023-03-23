import { getDiscordConfig } from './get-discord-config'

export function getAuthorizationUrl(): string {
  return `https://discord.com/api/oauth2/authorize?scope=${getDiscordConfig().oAuthScope}`
}
