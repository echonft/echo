/* eslint-disable @typescript-eslint/ban-ts-comment */
import { listingChangeHandler } from '../../src/handlers/listing-change-handler'
import { getDiscordChannel } from '../../src/utils/discord'
import { mockAndSetupChannel } from '../../src/utils/tests/discord/channel-mock'
import { mockClient } from '../../src/utils/tests/discord/client-mock'
import { mockGuild } from '../../src/utils/tests/discord/guild-mock'
import { FirestoreRequestForOffer, requestForOfferFirestoreData } from '@echo/firestore'
import { DocumentChange } from '@google-cloud/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Client } from 'discord.js'

jest.mock('@echo/firebase-admin')
jest.mock('../../src/utils/discord')

describe('handlers - listings', () => {
  const mockRequestForOffer = requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!
  // @ts-ignore
  const mockedGetDiscordChannel = jest.mocked(getDiscordChannel)
  const mockedUpdate = jest.fn((date) => {
    expect(date).toBeDefined()
    return Promise.resolve()
  })
  const mockedAddedDocChange = {
    type: 'added',
    doc: {
      ref: {
        update: mockedUpdate
      }
    }
  } as unknown as DocumentChange<FirestoreRequestForOffer>
  const mockedModifiedDocChange = {
    ...mockedAddedDocChange,
    type: 'modified'
  } as unknown as DocumentChange<FirestoreRequestForOffer>
  let client: Client

  beforeEach(() => {
    jest.clearAllMocks()
    client = mockClient()
  })

  it('if doc is not added, do nothing', async () => {
    await listingChangeHandler(client, mockRequestForOffer, mockedModifiedDocChange)
    expect(mockedGetDiscordChannel).toHaveBeenCalledTimes(0)
  })

  it('if doc is added but already posted, do nothing', async () => {
    await listingChangeHandler(client, { ...mockRequestForOffer, postedAt: 1 }, mockedModifiedDocChange)
    expect(mockedGetDiscordChannel).toHaveBeenCalledTimes(0)
  })

  it('if getDiscordChannel fails, do nothing', async () => {
    mockedGetDiscordChannel.mockRejectedValueOnce('test')
    await listingChangeHandler(client, mockRequestForOffer, mockedAddedDocChange)
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
  })
  it('if request for offer is valid, send to channel, if error, do nothing', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    mockedGetDiscordChannel.mockResolvedValue(mockChannel)
    const mockedSend = jest.spyOn(mockChannel, 'send').mockRejectedValue(new Error('test'))
    await listingChangeHandler(client, mockRequestForOffer, mockedAddedDocChange)
    expect(mockedSend).toHaveBeenCalledTimes(1)
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
  })
  it('if update fails, send to channel', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    mockedGetDiscordChannel.mockResolvedValue(mockChannel)
    mockedUpdate.mockRejectedValueOnce(new Error())
    // @ts-ignore
    const mockedSend = jest.spyOn(mockChannel, 'send').mockResolvedValue({})
    await listingChangeHandler(client, mockRequestForOffer, mockedAddedDocChange)
    expect(mockedSend).toHaveBeenCalledTimes(1)
    expect(mockedUpdate).toHaveBeenCalledTimes(1)
  })
  it('if request for offer is valid, send to channel, if success, will update', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    mockedGetDiscordChannel.mockResolvedValue(mockChannel)
    // @ts-ignore
    const mockedSend = jest.spyOn(mockChannel, 'send').mockResolvedValue({})
    await listingChangeHandler(client, mockRequestForOffer, mockedAddedDocChange)
    expect(mockedSend).toHaveBeenCalledTimes(1)
    expect(mockedUpdate).toHaveBeenCalledTimes(1)
  })
})
