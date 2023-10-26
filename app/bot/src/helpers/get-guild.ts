import { InvalidGuildIdError } from '@echo/bot/errors/invalid-guild-id-error'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

export async function getGuild(client: Client, guildId: string) {
  const cachedGuild = client.guilds.cache.get(guildId)
  if (isNil(cachedGuild)) {
    const guild = await client.guilds.fetch(guildId)
    if (isNil(guild)) {
      throw new InvalidGuildIdError(guild)
    }
    return guild
  }
  return cachedGuild
}
