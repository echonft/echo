import { NoGuildIdError } from '../../errors/no-guild-id-error'
import { loginLink } from '../../routing/login-link'
import { mockAndSetupChannel } from '../../utils/tests/discord/channel-mock'
import { setupBot } from '../../utils/tests/discord/client-mock'
import { mockGuild } from '../../utils/tests/discord/guild-mock'
import { mockChatInputCommandInteraction } from '../../utils/tests/discord/interaction-mock'
import { executeConnect } from '../connect'
import { discordGuilds, findDiscordGuildByGuildId } from '@echo/firebase-admin'
import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { R } from '@mobily/ts-belt'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

jest.mock('@echo/api', () => ({
  __esModule: true,
  getServerConfig: () => ({
    url: 'https://echonft.xyz'
  })
}))
jest.mock('@echo/firebase-admin')

describe('discord commands - connect', () => {
  jest.mocked(findDiscordGuildByGuildId).mockImplementation((guildId: string) =>
    Promise.resolve(
      R.fromExecution(() => {
        const guild = discordGuilds[guildId]
        if (isNil(guild)) {
          throw Error
        }
        return guild
      })
    )
  )
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
    const expectedLink = loginLink(id)
    const response = await executeConnect(mockInteraction)
    expect(response.content).toBe(expectedLink)
  })
})
