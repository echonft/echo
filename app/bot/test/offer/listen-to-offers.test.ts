import { listenToOffers } from '@echo/bot/offer/listen-to-offers'
import { offerChangeHandler } from '@echo/bot/offer/offer-change-handler'
import { mockAndSetupChannel } from '@echo/bot-mocks/discord/channel-mock'
import { mockClient } from '@echo/bot-mocks/discord/client-mock'
import { mockGuild } from '@echo/bot-mocks/discord/guild-mock'
import { mockGetDiscordChannel } from '@echo/bot-mocks/mock-get-discord-channel'
import { listenToOffers as firebaseListenToOffers } from '@echo/firestore/listeners/listen-to-offers'
import type { DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { Offer } from '@echo/model/types/offer'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Client } from 'discord.js'

jest.mock('@echo/firestore/listeners/listen-to-offers')
jest.mock('@echo/bot/helpers/get-discord-channel')
jest.mock('@echo/bot/offer/offer-change-handler')

describe('offer - listenToOffers', () => {
  const mockedListenToOffers = jest.mocked(firebaseListenToOffers)
  const mockedListingChangeHandler = jest.mocked(offerChangeHandler)

  let client: Client
  beforeEach(() => {
    jest.clearAllMocks()
    client = mockClient()
    mockGetDiscordChannel()
  })

  it('if request for offer changes, call handler', () => {
    mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    mockedListenToOffers.mockImplementationOnce(
      (onChange: (changeType: DocumentChangeType, listing: Offer) => unknown) => {
        return onChange('added', getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'))
      }
    )
    listenToOffers(client)
    expect(mockedListingChangeHandler).toBeCalled()
  })
})
