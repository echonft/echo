import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

export async function getGuild(client: Client, guildId: string) {
  const cachedGuild = client.guilds.cache.get(guildId)
  if (isNil(cachedGuild)) {
    try {
      const guild = await client.guilds.fetch(guildId)
      if (isNil(guild)) {
        logger.error(`Guild with id ${guildId} not found`)
        return undefined
      }
      return guild
    } catch (e) {
      logger.error(`Guild with id ${guildId} not found: ${errorMessage(e)}`)
      return undefined
    }
  }
  return cachedGuild
}
