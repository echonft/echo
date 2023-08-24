import { InvalidChannelIdError } from '../../src/errors/invalid-channel-id-error'
import { getDiscordChannel } from '../../src/helpers/get-discord-channel'
import { mockAndSetupChannel, mockTextChannel } from '../mocks/discord/channel-mock'
import { mockClient } from '../mocks/discord/client-mock'
import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals'
import { Client, TextChannel } from 'discord.js'

describe('utils - getDiscordChannel', () => {
  let client: Client
  afterEach(() => {
    jest.clearAllMocks()
  })
  beforeEach(() => {
    client = mockClient()
  })
  describe('only cache', () => {
    test('If channel but wrong ID, error', async () => {
      mockAndSetupChannel(client, undefined, { id: '1' })
      await expect(getDiscordChannel(client, '2')).rejects.toEqual(new InvalidChannelIdError('2'))
    })
    test('If channel with good id, success', async () => {
      const channel = mockAndSetupChannel(client, undefined, { id: '1' })
      await expect(getDiscordChannel(client, '1')).resolves.toBe(channel)
    })
  })
  describe('with fetch', () => {
    let channel: TextChannel
    beforeEach(() => {
      channel = mockTextChannel(client, undefined, { id: '2' })
      jest.spyOn(client.channels, 'fetch').mockImplementation((id) => Promise.resolve(id === '2' ? channel : null))
    })
    test('If wrong channel, throws an error', async () => {
      await expect(getDiscordChannel(client, '1')).rejects.toEqual(new InvalidChannelIdError('1'))
    })
    test('If channel but wrong ID, error', async () => {
      mockTextChannel(client, undefined, { id: '1' })
      await expect(getDiscordChannel(client, '3')).rejects.toEqual(new InvalidChannelIdError('3'))
    })
    test('If channel with good id, success', async () => {
      await expect(getDiscordChannel(client, '2')).resolves.toBe(channel)
    })
  })
})
