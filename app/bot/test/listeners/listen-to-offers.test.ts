/* eslint-disable @typescript-eslint/ban-ts-comment */
import { offerChangeHandler } from '../../src/handlers/offer-change-handler'
import { listenToOffers } from '../../src/listeners/listen-to-offers'
import { getDiscordChannel } from '../../src/utils/discord'
import { mockAndSetupChannel } from '../../src/utils/tests/discord/channel-mock'
import { mockClient } from '../../src/utils/tests/discord/client-mock'
import { mockGuild } from '../../src/utils/tests/discord/guild-mock'
import { listenToOffers as firebaseListenToOffers } from '@echo/firebase-admin'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Client } from 'discord.js'

jest.mock('@echo/firebase-admin')
jest.mock('../../src/utils/discord')
jest.mock('../../src/handlers/offer-change-handler')

describe('listeners - listenToOffers', () => {
  const mockedGetDiscordChannel = jest.mocked(getDiscordChannel)
  const mockedListenToOffers = jest.mocked(firebaseListenToOffers)
  const mockedListingChangeHandler = jest.mocked(offerChangeHandler)

  let client: Client
  beforeEach(() => {
    jest.clearAllMocks()
    client = mockClient()
  })

  it('if request for offer changes, call handler', () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    mockedListenToOffers.mockImplementationOnce((onChange) =>
      // @ts-ignore
      onChange()
    )

    mockedGetDiscordChannel.mockResolvedValue(mockChannel)
    listenToOffers(client)
    expect(mockedListingChangeHandler).toBeCalled()
  })
})
