import { isNil } from 'ramda'

export async function getGuild(guildId: string) {
  const cachedGuild = client.guilds.cache.get(guildId)
  if (isNil(cachedGuild)) {
    return await client.guilds.fetch(guildId)
  }
  return cachedGuild
}
