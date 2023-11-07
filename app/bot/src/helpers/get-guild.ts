import { Client } from 'discord.js'
import { isNil } from 'ramda'

export async function getGuild(client: Client, guildId: string) {
  const cachedGuild = client.guilds.cache.get(guildId)
  if (isNil(cachedGuild)) {
    return await client.guilds.fetch(guildId)
  }
  return cachedGuild
}
