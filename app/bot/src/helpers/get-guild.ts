import type { WithLogger } from '@echo/utils/types/with-logger'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

interface GetGuildArgs extends WithLogger {
  client: Client
  guildId: string
}

export async function getGuild(args: GetGuildArgs) {
  const { client, guildId } = args
  const cachedGuild = client.guilds.cache.get(guildId)
  if (isNil(cachedGuild)) {
    return await client.guilds.fetch(guildId)
  }
  return cachedGuild
}
