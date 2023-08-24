/* eslint-disable @typescript-eslint/ban-ts-comment */
import { offerChangeHandler } from '../../src/handlers/offer-change-handler'
import { listenToOffers } from '../../src/listeners/listen-to-offers'
import { mockAndSetupChannel } from '../mocks/discord/channel-mock'
import { mockClient } from '../mocks/discord/client-mock'
import { mockGuild } from '../mocks/discord/guild-mock'
import { listenToOffers as firebaseListenToOffers } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Client } from 'discord.js'

jest.mock('@echo/firestore')
jest.mock('../../src/helpers/get-discord-channel')
jest.mock('../../src/handlers/offer-change-handler')

describe('listeners - listenToOffers', () => {
  const mockedListenToOffers = jest.mocked(firebaseListenToOffers)
  const mockedListingChangeHandler = jest.mocked(offerChangeHandler)

  let client: Client
  beforeEach(() => {
    jest.clearAllMocks()
    client = mockClient()
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
