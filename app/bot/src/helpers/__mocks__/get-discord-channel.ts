import { InvalidChannelIdError } from '../../errors/invalid-channel-id-error'
import { Client, TextChannel } from 'discord.js'
import { isNil } from 'ramda'

export const getDiscordChannel: (client: Client, channelId: string) => Promise<TextChannel> = (client, channelId) => {
  if (channelId === 'reject') {
    return Promise.reject(new Error())
  }
  if (channelId === 'throw') {
    throw new InvalidChannelIdError(channelId)
  }
  const cachedChannel = client.channels.cache.get(channelId)
  if (isNil(cachedChannel)) {
    return client.channels.fetch(channelId).then((channel) => {
      if (isNil(channel)) {
        throw new InvalidChannelIdError(channelId)
      }
      return channel as TextChannel
    })
  }
  return Promise.resolve(cachedChannel as TextChannel)
}
