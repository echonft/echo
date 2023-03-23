import { DiscordConfig } from '../types'
import { getDiscordConfig } from './get-discord-config'

export * from './get-authorization-url'
export * from './get-discord-app-environment'
export const discordConfig: DiscordConfig = getDiscordConfig()
