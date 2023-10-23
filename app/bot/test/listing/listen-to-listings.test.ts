import { listenToListings } from '@echo/bot/listing/listen-to-listings'
import { listingChangeHandler } from '@echo/bot/listing/listing-change-handler'
import { mockAndSetupChannel } from '@echo/bot-mocks/discord/channel-mock'
import { mockClient } from '@echo/bot-mocks/discord/client-mock'
import { mockGuild } from '@echo/bot-mocks/discord/guild-mock'
import { mockGetDiscordChannel } from '@echo/bot-mocks/mock-get-discord-channel'
import { listenToListings as FirestoreListenToListings } from '@echo/firestore/listeners/listen-to-listings'
import type { DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { Listing } from '@echo/model/types/listing'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Client } from 'discord.js'

jest.mock('@echo/firestore/listeners/listen-to-listings')
jest.mock('@echo/bot/helpers/get-discord-channel')
jest.mock('@echo/bot/listing/listing-change-handler')

describe('listing - listenToListings', () => {
  const mockedListenToListings = jest.mocked(FirestoreListenToListings)
  const mockedListingChangeHandler = jest.mocked(listingChangeHandler)

  let client: Client
  beforeEach(() => {
    jest.clearAllMocks()
    client = mockClient()
    mockGetDiscordChannel()
  })

  it('if listings change, call handler', () => {
    mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    mockedListenToListings.mockImplementationOnce(
      (onChange: (changeType: DocumentChangeType, listing: Listing) => unknown) => {
        return onChange('added', getListingMockById('jUzMtPGKM62mMhEcmbN4'))
      }
    )
    listenToListings(client)
    expect(mockedListingChangeHandler).toBeCalled()
  })
})
