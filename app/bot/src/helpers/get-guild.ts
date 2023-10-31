import { logger } from '@echo/utils/services/logger'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

export async function getGuild(client: Client, guildId: string) {
  const cachedGuild = client.guilds.cache.get(guildId)
  if (isNil(cachedGuild)) {
    const guild = await client.guilds.fetch(guildId)
    if (isNil(guild)) {
      logger.error(`Guild with id ${guildId} not found`)
      return undefined
    }
    return guild
  }
  return cachedGuild
}
