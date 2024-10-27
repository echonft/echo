import { ChannelError } from '@echo/bot/constants/errors/channel-error'
import { type Client, TextChannel } from 'discord.js'
import { isNil } from 'ramda'

interface GetChannelArgs {
  readonly client: Client
  readonly channelId: string
}

export async function getChannel(args: GetChannelArgs): Promise<TextChannel> {
  const { client, channelId } = args
  const cachedChannel = client.channels.cache.get(channelId)
  if (isNil(cachedChannel)) {
    const channel = await client.channels.fetch(channelId)
    if (isNil(channel)) {
      logger.error({ channel: { id: channelId } }, ChannelError.NotFound)
      return Promise.reject(Error(ChannelError.NotFound))
    }
    return channel as TextChannel
  }
  return cachedChannel as TextChannel
}
