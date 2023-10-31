import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { Client, TextChannel } from 'discord.js'
import { isNil } from 'ramda'

export async function getChannel(client: Client, channelId: string) {
  const cachedChannel = client.channels.cache.get(channelId)
  if (isNil(cachedChannel)) {
    try {
      const channel = await client.channels.fetch(channelId)
      if (isNil(channel)) {
        logger.error(`Channel ${channelId} not found`)
        return undefined
      }
      return channel as TextChannel
    } catch (e) {
      logger.error(`Channel ${channelId} not found: ${errorMessage(e)}`)
      return undefined
    }
  }
  return cachedChannel as TextChannel
}
