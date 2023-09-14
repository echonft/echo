/* eslint-disable @typescript-eslint/ban-ts-comment */
import { listingChangeHandler } from '@echo/bot/handlers/listing-change-handler'
import { listenToListings } from '@echo/bot/listeners/listen-to-listings'
import { mockAndSetupChannel } from '@echo/bot-mocks/discord/channel-mock'
import { mockClient } from '@echo/bot-mocks/discord/client-mock'
import { mockGuild } from '@echo/bot-mocks/discord/guild-mock'
import { mockGetDiscordChannel } from '@echo/bot-mocks/mock-get-discord-channel'
import { listenToListings as FirestoreListenToListings } from '@echo/firestore/listeners/listen-to-listings'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Client } from 'discord.js'

jest.mock('@echo/firestore/listeners/listen-to-listings')
jest.mock('@echo/bot/helpers/get-discord-channel')
jest.mock('@echo/bot/handlers/listing-change-handler')

describe('listeners - listenToListings', () => {
  const mockedListenToRequestForOffers = jest.mocked(FirestoreListenToListings)
  const mockedListingChangeHandler = jest.mocked(listingChangeHandler)

  let client: Client
  beforeEach(() => {
    jest.clearAllMocks()
    client = mockClient()
    mockGetDiscordChannel()
  })

  it('if request for offer changes, call handler', () => {
    mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    mockedListenToRequestForOffers.mockImplementationOnce((onChange) =>
      // @ts-ignore
      onChange()
    )
    listenToListings(client)
    expect(mockedListingChangeHandler).toBeCalled()
  })
})
