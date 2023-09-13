/* eslint-disable @typescript-eslint/ban-ts-comment */
import { listingChangeHandler } from '../../src/handlers/listing-change-handler'
import { listenToListings } from '../../src/listeners/listen-to-listings'
import { mockAndSetupChannel } from '../mocks/discord/channel-mock'
import { mockClient } from '../mocks/discord/client-mock'
import { mockGuild } from '../mocks/discord/guild-mock'
import { listenToListings as FirestoreListenToListings } from '@echo/firestore/listeners/listen-to-listings'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Client } from 'discord.js'

jest.mock('@echo/firestore/listeners/listen-to-listings')
jest.mock('../../src/helpers/get-discord-channel')
jest.mock('../../src/handlers/listing-change-handler')

describe('listeners - listenToListings', () => {
  const mockedListenToRequestForOffers = jest.mocked(FirestoreListenToListings)
  const mockedListingChangeHandler = jest.mocked(listingChangeHandler)

  let client: Client
  beforeEach(() => {
    jest.clearAllMocks()
    client = mockClient()
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
