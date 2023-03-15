import { getDiscordChannel } from '../discord'
import { describe, expect, jest, test } from '@jest/globals'
import { Client } from 'discord.js'

function mockDiscordWithChannels(
  _mockCachedChannels?: Map<string, string>,
  _mockFetchedChannels?: Map<string, string>
) {
  jest.mock('discord.js', () => {
    return {
      Client: jest.fn(() => ({
        channels: {
          cache: new Map()
        }
      }))
    }
  })
}

describe('discord util', () => {
  // afterEach(() => {})
  // beforeEach(() => {})
  test('undefined values throws an error', async () => {
    mockDiscordWithChannels(new Map([['1', 'testChannel']]))
    const client = new Client({ intents: [1] })
    // console.log(`channels are ${JSON.stringify(client.channels.cache.get('1'))}`)
    expect(await getDiscordChannel(client, '1')).toBe('testChannel')
  })
})
