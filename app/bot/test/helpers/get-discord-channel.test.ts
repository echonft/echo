import { getChannel } from '@echo/bot/helpers/get-channel'
import { mockAndSetupChannel, mockTextChannel } from '@echo/bot-mocks/discord/channel-mock'
import { mockClient } from '@echo/bot-mocks/discord/client-mock'
import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals'
import { Client, TextChannel } from 'discord.js'

describe('helpers - getChannel', () => {
  let client: Client
  afterEach(() => {
    jest.clearAllMocks()
  })
  beforeEach(() => {
    client = mockClient()
  })
  describe('only cache', () => {
    test('If channel but wrong ID, returns undefined', async () => {
      mockAndSetupChannel(client, undefined, { id: '1' })
      const channel = await getChannel(client, '2')
      expect(channel).toBeUndefined()
    })
    test('If channel with good id, returns the channel', async () => {
      const channel = mockAndSetupChannel(client, undefined, { id: '1' })
      await expect(getChannel(client, '1')).resolves.toBe(channel)
    })
  })
  describe('with fetch', () => {
    let channel: TextChannel
    beforeEach(() => {
      channel = mockTextChannel(client, undefined, { id: '2' })
      jest.spyOn(client.channels, 'fetch').mockImplementation((id) => Promise.resolve(id === '2' ? channel : null))
    })
    test('returns undefined if the channel id is wrong', async () => {
      const channel = await getChannel(client, '1')
      expect(channel).toBeUndefined()
    })
    test('If channel with good id, success', async () => {
      await expect(getChannel(client, '2')).resolves.toBe(channel)
    })
  })
})
