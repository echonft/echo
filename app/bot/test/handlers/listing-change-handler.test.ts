/* eslint-disable @typescript-eslint/ban-ts-comment */
import { listingChangeHandler } from '../../src/handlers/listing-change-handler'
import { mockAndSetupChannel } from '../../src/utils/tests/discord/channel-mock'
import { mockClient } from '../../src/utils/tests/discord/client-mock'
import { mockGuild } from '../../src/utils/tests/discord/guild-mock'
import { FirestoreRequestForOffer, FirestoreRequestForOfferData } from '@echo/firestore'
import { DocumentChange } from '@google-cloud/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Client } from 'discord.js'

jest.mock('@echo/firestore')
jest.mock('../../src/utils/get-discord-channel')
jest.mock('../../src/routing/get-base-url')

function setChannelForRequestForOffer(
  requestForOffer: FirestoreRequestForOfferData,
  channelId: string
): FirestoreRequestForOfferData {
  return { ...requestForOffer, discordGuild: { ...requestForOffer.discordGuild, channelId } }
}

describe('handlers - listingChangeHandler', () => {
  const mockRequestForOffer: FirestoreRequestForOfferData = {
    id: 'jUzMtPGKM62mMhEcmbN4',
    sender: {
      discordId: 'senderDiscordId'
    },
    items: [
      {
        id: '8hHFadIrrooORfTOLkBg',
        collection: {
          id: '1aomCtnoesD7WVll6Yi1',
          name: 'Spiral Frequencies'
        },
        name: 'Spiral Frequencies #1376',
        tokenId: 1376
      },
      {
        id: 'QFjMRNChUAHNswkRADXh',
        collection: {
          id: 'Rc8pLQXxgyQGIRL0fr13',
          name: 'pxMythics Genesis'
        },
        name: 'Creative Demigod #024',
        tokenId: 17
      }
    ],
    discordGuild: {
      id: 'xA40abnyBq6qQHSYmtHj',
      discordId: '1',
      channelId: '1',
      name: 'Spiral Frequencies'
    },
    target: [
      {
        id: '37dBlwJYahEAKeL0rNP8',
        tokenType: 'ERC721',
        address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
        chainId: 1,
        name: 'Mythics Genesis',
        symbol: 'MGEN'
      }
    ]
  } as unknown as FirestoreRequestForOfferData
  const mockedUpdate = jest.fn()
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
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
  })

  it('if doc is added but already posted, do nothing', async () => {
    await listingChangeHandler(client, { ...mockRequestForOffer, postedAt: 1 }, mockedModifiedDocChange)
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
  })

  it('if getDiscordChannel fails, do nothing', async () => {
    await listingChangeHandler(client, mockRequestForOffer, mockedAddedDocChange)
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
  })
  it('if getDiscordChannel throws, do nothing', async () => {
    const requestForOffer = setChannelForRequestForOffer(mockRequestForOffer, 'throw')
    await listingChangeHandler(client, requestForOffer, mockedAddedDocChange)
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
  })
  it('if request for offer is valid, send to channel, if error, do nothing', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    const requestForOffer = setChannelForRequestForOffer(mockRequestForOffer, mockChannel.id)
    const mockedSend = jest.spyOn(mockChannel, 'send').mockImplementation((options) => {
      // @ts-ignore
      expect(options.components).toBeDefined()
      // @ts-ignore
      expect(options.embeds).toBeDefined()
      return Promise.reject(new Error('Test'))
    })
    await listingChangeHandler(client, requestForOffer, mockedAddedDocChange)
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
    expect(mockedSend).toHaveBeenCalledTimes(1)
  })
  it('if update fails, send to channel', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    const requestForOffer = setChannelForRequestForOffer(mockRequestForOffer, mockChannel.id)
    // @ts-ignore
    const mockedSend = jest.spyOn(mockChannel, 'send').mockImplementation((options) => {
      // @ts-ignore
      expect(options.components).toBeDefined()
      // @ts-ignore
      expect(options.embeds).toBeDefined()
      return Promise.resolve()
    })
    mockedUpdate.mockImplementationOnce((updatedData) => {
      // @ts-ignore
      expect(updatedData.postedAt).toBeDefined()
      return Promise.reject(new Error('Test'))
    })
    await listingChangeHandler(client, requestForOffer, mockedAddedDocChange)
    expect(mockedSend).toHaveBeenCalledTimes(1)
    expect(mockedUpdate).toHaveBeenCalledTimes(1)
  })
  it('if request for offer is valid, send to channel, if success, will update', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    const requestForOffer = setChannelForRequestForOffer(mockRequestForOffer, mockChannel.id)
    // @ts-ignore
    const mockedSend = jest.spyOn(mockChannel, 'send').mockImplementation((options) => {
      // @ts-ignore
      expect(options.components).toBeDefined()
      // @ts-ignore
      expect(options.embeds).toBeDefined()
      return Promise.resolve()
    })
    mockedUpdate.mockImplementationOnce((updatedData) => {
      // @ts-ignore
      expect(updatedData.postedAt).toBeDefined()
      return Promise.resolve()
    })
    await listingChangeHandler(client, requestForOffer, mockedAddedDocChange)
    expect(mockedSend).toHaveBeenCalledTimes(1)
    expect(mockedUpdate).toHaveBeenCalledTimes(1)
  })
})
