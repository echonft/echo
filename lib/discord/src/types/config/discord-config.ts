import { AppEnvironment } from './app-environment'

export interface DiscordConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  guildId?: string
  appEnvironment: AppEnvironment
  oAuthScope: string
}
