import { logger } from '@echo/utils/services/logger'
import { Client, TextChannel } from 'discord.js'
import { isNil } from 'ramda'

export async function getChannel(client: Client, channelId: string) {
  const cachedChannel = client.channels.cache.get(channelId)
  if (isNil(cachedChannel)) {
    const channel = await client.channels.fetch(channelId)
    if (isNil(channel)) {
      logger.error(`Channel ${channelId} not found`)
      return undefined
    }
    return channel as TextChannel
  }
  return cachedChannel as TextChannel
}
