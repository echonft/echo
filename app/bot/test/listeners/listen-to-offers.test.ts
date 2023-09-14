/* eslint-disable @typescript-eslint/ban-ts-comment */
import { offerChangeHandler } from '@echo/bot/handlers/offer-change-handler'
import { listenToOffers } from '@echo/bot/listeners/listen-to-offers'
import { mockAndSetupChannel } from '@echo/bot-mocks/discord/channel-mock'
import { mockClient } from '@echo/bot-mocks/discord/client-mock'
import { mockGuild } from '@echo/bot-mocks/discord/guild-mock'
import { mockGetDiscordChannel } from '@echo/bot-mocks/mock-get-discord-channel'
import { listenToOffers as firebaseListenToOffers } from '@echo/firestore/listeners/listen-to-offers'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Client } from 'discord.js'

jest.mock('@echo/firestore/listeners/listen-to-offers')
jest.mock('@echo/bot/helpers/get-discord-channel')
jest.mock('@echo/bot/handlers/offer-change-handler')

describe('listeners - listenToOffers', () => {
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
    mockedListenToOffers.mockImplementationOnce((onChange) =>
      // @ts-ignore
      onChange()
    )
    listenToOffers(client)
    expect(mockedListingChangeHandler).toBeCalled()
  })
})
