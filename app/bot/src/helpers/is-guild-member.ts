import { getGuild } from '@echo/bot/helpers/get-guild'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

export async function isGuildMember(client: Client, guildId: string, userId: string) {
  const guild = await getGuild(client, guildId)
  if (isNil(guild)) {
    return false
  }
  try {
    const member = await guild.members.fetch({ user: userId })
    return !isNil(member)
  } catch (e) {
    logger.error(`Error fetching guild ${guild.id} members: ${errorMessage(e)}`)
    return false
  }
}
