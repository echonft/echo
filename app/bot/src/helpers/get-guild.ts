import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

interface GetGuildArgs {
  client: Client
  guildId: string
  logger?: Nullable<Logger>
}

export async function getGuild(args: GetGuildArgs) {
  const { client, guildId } = args
  const cachedGuild = client.guilds.cache.get(guildId)
  if (isNil(cachedGuild)) {
    return await client.guilds.fetch(guildId)
  }
  return cachedGuild
}
