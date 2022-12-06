import { AppEnvironment } from './app-environment'

export interface DiscordConfig {
  clientId: string
  redirectUri: string
  guildId?: string
  appEnvironment: AppEnvironment
}
