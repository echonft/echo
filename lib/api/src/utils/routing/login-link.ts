import { discordConfig } from '@echo/discord'

export const loginLink: string = encodeURI(
  `https://discord.com/api/oauth2/authorize?client_id=${discordConfig.clientId}&redirect_uri=${discordConfig.redirectUri}&response_type=code&scope=identify`
)
