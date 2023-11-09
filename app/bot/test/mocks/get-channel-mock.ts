import { getChannel } from '@echo/bot/helpers/get-channel'
import { jest } from '@jest/globals'
import { Client, TextChannel } from 'discord.js'
import { isNil } from 'ramda'

export function getChannelMock() {
  jest.mocked(getChannel).mockImplementationOnce(async (client: Client, channelId: string) => {
    const cachedChannel = client.channels.cache.get(channelId)
    if (isNil(cachedChannel)) {
      const channel = await client.channels.fetch(channelId)
      if (isNil(channel)) {
        throw Error('channel not found')
      }
      return channel as TextChannel
    }
    return cachedChannel as TextChannel
  })
}
