import { discordConfig } from '../config/config'

export enum Routes {
  TOKEN = 'https://discord.com/api/v10/oauth2/token',
  USER = 'https://discord.com/api/users/@me'
}

export interface TokenRoutePostData extends Record<string, string> {
  client_id: string
  client_secret: string
  grant_type: string
  code: string
  redirect_uri: string
  scope: string
}

export function getLoginLink(): string {
  const config = discordConfig()
  return encodeURI(
    `https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&response_type=code&scope=identify`
  )
}
