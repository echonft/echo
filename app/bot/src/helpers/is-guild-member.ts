import { getGuild } from '@echo/bot/helpers/get-guild'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

export async function isGuildMember(client: Client, guildId: string, userId: string) {
  const guild = await getGuild(client, guildId)
  const member = await guild.members.fetch({ user: userId })
  return !isNil(member)
}
