import { InvalidChannelIdError } from '@echo/bot/errors/invalid-channel-id-error'
import { getChannel } from '@echo/bot/helpers/get-channel'
import { jest } from '@jest/globals'
import { Client, TextChannel } from 'discord.js'
import { isNil } from 'ramda'

export function mockGetDiscordChannel() {
  jest.mocked(getChannel).mockImplementationOnce((client: Client, channelId: string) => {
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
  })
}
