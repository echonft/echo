import { discordConfig } from '../config'

export const loginLink: string = encodeURI(
  `https://discord.com/api/oauth2/authorize?client_id=${discordConfig.clientId}&redirect_uri=${discordConfig.redirectUri}&response_type=code&scope=identify`
)

export * from './create-offer-link'
export * from './get-echo-link'
