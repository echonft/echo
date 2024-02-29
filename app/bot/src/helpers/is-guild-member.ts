import { getGuild } from '@echo/bot/helpers/get-guild'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

// FIXME might be needed if we support collection guilds
// noinspection JSUnusedGlobalSymbols
export async function isGuildMember(client: Client, guildId: string, userId: string) {
  const guild = await getGuild(client, guildId)
  if (isNil(guild)) {
    return false
  }
  const member = await guild.members.fetch({ user: userId })
  return !isNil(member)
}
