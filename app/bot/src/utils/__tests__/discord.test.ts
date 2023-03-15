import { InvalidChannelIdError } from '../../errors/invalid-channel-id-error'
import { getDiscordChannel } from '../discord'
import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { ChannelManager, Client } from 'discord.js'

jest.mock('discord.js')

describe('discord util', () => {
  // afterEach(() => {})
  beforeEach(() => {})
  test('undefined values throws an error', () => {
    const mockedClient = jest.mocked(Client)
    const mockedChannelManager = jest.mocked(ChannelManager)
    jest.spyOn

    expect(getDiscordChannel(mockedClient.mock.instances[0]!, '')).toThrowError(InvalidChannelIdError)
  })
})
