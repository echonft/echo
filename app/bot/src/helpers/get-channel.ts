import { type Client, TextChannel } from 'discord.js'
import { isNil } from 'ramda'

interface GetChannelArgs {
  client: Client
  channelId: string
}

export async function getChannel(args: GetChannelArgs): Promise<TextChannel> {
  const { client, channelId } = args
  const cachedChannel = client.channels.cache.get(channelId)
  if (isNil(cachedChannel)) {
    const channel = await client.channels.fetch(channelId)
    if (isNil(channel)) {
      logger.error({ channel: { id: channelId } }, 'channel not found')
      throw Error(`channel ${channelId} not found`)
    }
    return channel as TextChannel
  }
  return cachedChannel as TextChannel
}
