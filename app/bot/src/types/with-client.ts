import type { Client } from 'discord.js'

export interface WithClient {
  client: Client
}

export type WithClientType<T> = T & WithClient
