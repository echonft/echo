/* eslint-disable @typescript-eslint/ban-ts-comment */
import { listingChangeHandler } from '../../src/handlers/listing-change-handler'
import { listenToListings } from '../../src/listeners/listen-to-listings'
import { getDiscordChannel } from '../../src/utils/discord'
import { mockAndSetupChannel } from '../../src/utils/tests/discord/channel-mock'
import { mockClient } from '../../src/utils/tests/discord/client-mock'
import { mockGuild } from '../../src/utils/tests/discord/guild-mock'
import { listenToRequestForOffers } from '@echo/firebase-admin'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Client } from 'discord.js'

jest.mock('@echo/firebase-admin')
jest.mock('../../src/utils/discord')
jest.mock('../../src/handlers/listing-change-handler')

describe('listeners - listenToListings', () => {
  const mockedGetDiscordChannel = jest.mocked(getDiscordChannel)
  const mockedListenToRequestForOffers = jest.mocked(listenToRequestForOffers)
  const mockedListingChangeHandler = jest.mocked(listingChangeHandler)

  let client: Client
  beforeEach(() => {
    jest.clearAllMocks()
    client = mockClient()
  })

  it('if request for offer changes, call handler', () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    mockedListenToRequestForOffers.mockImplementationOnce((onChange) =>
      // @ts-ignore
      onChange()
    )
    mockedGetDiscordChannel.mockResolvedValue(mockChannel)
    listenToListings(client)
    expect(mockedListingChangeHandler).toBeCalled()
  })
})
