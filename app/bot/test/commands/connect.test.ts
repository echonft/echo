import { executeConnect } from '../../src/commands/connect'
import { NoGuildIdError } from '../../src/errors/no-guild-id-error'
import { collectionLink } from '../../src/routing/collection-link'
import { mockAndSetupChannel } from '../../src/utils/tests/discord/channel-mock'
import { setupBot } from '../../src/utils/tests/discord/client-mock'
import { mockGuild } from '../../src/utils/tests/discord/guild-mock'
import { mockChatInputCommandInteraction } from '../../src/utils/tests/discord/interaction-mock'
import { findDiscordGuildByGuildId } from '@echo/firebase-admin'
import { discordGuildFirestoreData } from '@echo/firestore'
import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

jest.mock('@echo/firebase-admin')
jest.mock('../../src/routing/get-base-url')

describe('discord commands - connect', () => {
  jest.mocked(findDiscordGuildByGuildId).mockImplementation((guildId: string) => {
    const guild = discordGuildFirestoreData[guildId]
    if (isNil(guild)) {
      return Promise.reject('not found')
    }
    return Promise.resolve(guild)
  })
  let client: Client
  beforeEach(async () => {
    jest.clearAllMocks()
    client = await setupBot()
  })
  test('If no guildId, throws an error', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    const mockInteraction = mockChatInputCommandInteraction({
      client,
      name: 'testName',
      id: 'testId',
      channel: mockChannel
    })
    try {
      await executeConnect(mockInteraction)
    } catch (e) {
      expect(e).toStrictEqual(new NoGuildIdError())
    }
  })
  test('If guildId not in the database, returns error message', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '1234' }))
    const mockInteraction = mockChatInputCommandInteraction({
      client,
      name: 'testName',
      id: 'testId',
      channel: mockChannel
    })
    const response = await executeConnect(mockInteraction)
    expect(response.content).toBe('Trying to use echo from an wrong server')
  })
  test('If guildId exists, return the proper login link', async () => {
    const id = 'xA40abnyBq6qQHSYmtHj'
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id }))
    const mockInteraction = mockChatInputCommandInteraction({
      client,
      name: 'testName',
      id: 'testId',
      channel: mockChannel
    })
    const callbackQuery = new URLSearchParams({ callbackUrl: collectionLink(id) })
    const expectedLink = `https://echonft.xyz/login?${callbackQuery.toString()}`
    const response = await executeConnect(mockInteraction)
    expect(response.content).toBe(expectedLink)
  })
})
