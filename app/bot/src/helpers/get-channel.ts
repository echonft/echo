import { InvalidChannelIdError } from '@echo/bot/errors/invalid-channel-id-error'
import { Client, TextChannel } from 'discord.js'
import { isNil } from 'ramda'

export async function getChannel(client: Client, channelId: string): Promise<TextChannel> {
  const cachedChannel = client.channels.cache.get(channelId)
  if (isNil(cachedChannel)) {
    const channel = await client.channels.fetch(channelId)
    if (isNil(channel)) {
      throw new InvalidChannelIdError(channelId)
    }
    return channel as TextChannel
  }
  return cachedChannel as TextChannel
}
