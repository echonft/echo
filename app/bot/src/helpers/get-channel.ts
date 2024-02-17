import { client } from '@echo/bot/constants/client'
import { TextChannel } from 'discord.js'
import { isNil } from 'ramda'

export async function getChannel(channelId: string) {
  const cachedChannel = client.channels.cache.get(channelId)
  if (isNil(cachedChannel)) {
    const channel = await client.channels.fetch(channelId)
    if (isNil(channel)) {
      throw Error(`channel ${channelId} not found`)
    }
    return channel as TextChannel
  }
  return cachedChannel as TextChannel
}
