/* eslint-disable @typescript-eslint/ban-ts-comment */
import { offerChangeHandler } from '../../src/handlers/offer-change-handler'
import { mockAndSetupChannel, mockPrivateThread } from '../../src/utils/tests/discord/channel-mock'
import { mockClient } from '../../src/utils/tests/discord/client-mock'
import { mockGuild } from '../../src/utils/tests/discord/guild-mock'
import { FirestoreOffer, FirestoreOfferData } from '@echo/firestore'
import { DocumentChange } from '@google-cloud/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Client } from 'discord.js'

jest.mock('@echo/firestore')
jest.mock('../../src/utils/get-discord-channel')
jest.mock('../../src/routing/get-base-url')

function setChannelForOffer(offer: FirestoreOfferData, channelId: string): FirestoreOfferData {
  return { ...offer, discordGuild: { ...offer.discordGuild, channelId } }
}

describe('handlers - offerChangeHandler', () => {
  const mockOffer = {
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    state: 'OPEN',
    discordGuild: {
      id: 'xA40abnyBq6qQHSYmtHj',
      discordId: '1',
      channelId: '1',
      name: 'Spiral Frequencies'
    },
    threadId: '1231',
    sender: {
      discordId: 'senderDiscordId'
    },
    senderItems: [
      {
        id: '8hHFadIrrooORfTOLkBg',
        collection: {
          id: '1aomCtnoesD7WVll6Yi1',
          name: 'Spiral Frequencies'
        },
        name: 'Spiral Frequencies #1376',
        tokenId: 1376
      }
    ],
    receiver: {
      discordId: 'receiverDiscordId'
    },
    receiverItems: [
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
    postedAt: undefined,
    expiresAt: 1676984897
  } as unknown as FirestoreOfferData
  const mockedUpdate = jest.fn()
  const mockedAddedDocChange = {
    type: 'added',
    doc: {
      ref: {
        update: mockedUpdate
      }
    }
  } as unknown as DocumentChange<FirestoreOffer>
  const mockedModifiedDocChange = {
    ...mockedAddedDocChange,
    type: 'modified'
  } as unknown as DocumentChange<FirestoreOffer>
  let client: Client

  beforeEach(() => {
    jest.clearAllMocks()
    client = mockClient()
  })

  it('if doc is not added, do nothing', async () => {
    await offerChangeHandler(client, mockOffer, mockedModifiedDocChange)
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
  })

  it('if doc is added but already posted, do nothing', async () => {
    await offerChangeHandler(client, { ...mockOffer, postedAt: 1 }, mockedModifiedDocChange)
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
  })

  it('if getDiscordChannel fails, do nothing', async () => {
    await offerChangeHandler(client, mockOffer, mockedAddedDocChange)
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
  })
  it('if getDiscordChannel throws, do nothing', async () => {
    const offer = setChannelForOffer(mockOffer, 'throw')
    await offerChangeHandler(client, offer, mockedAddedDocChange)
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
  })
  it('if users are not in guild, do nothing', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    const offer = setChannelForOffer(mockOffer, mockChannel.id)
    const mockedThreadCreation = jest.spyOn(mockChannel.threads, 'create')
    await offerChangeHandler(client, { ...offer, sender: { ...offer.sender, discordGuilds: [] } }, mockedAddedDocChange)
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
    expect(mockedThreadCreation).toHaveBeenCalledTimes(0)
  })
  it('if thread creation fails, do nothing', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    const offer = setChannelForOffer(mockOffer, mockChannel.id)
    // @ts-ignore
    jest.replaceProperty(mockChannel, 'threads', {
      create: (options) => {
        expect(options.name).toEqual(`Offer-${offer.id}`)
        return Promise.reject(new Error('Test'))
      }
    })
    await offerChangeHandler(client, offer, mockedAddedDocChange)
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
  })
  it('if adding members to thread fails, do nothing', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    const mockThread = mockPrivateThread(client, mockChannel)
    const offer = setChannelForOffer(mockOffer, mockChannel.id)
    // @ts-ignore
    jest.replaceProperty(mockChannel, 'threads', {
      create: (options) => {
        expect(options.name).toEqual(`Offer-${offer.id}`)
        return Promise.resolve(mockThread)
      }
    })
    // @ts-ignore
    jest.replaceProperty(mockThread, 'members', {
      add: (user) => {
        expect([offer.sender.discordId, offer.receiver.discordId]).toContain(user)
        return Promise.reject(new Error('Test'))
      }
    })
    await offerChangeHandler(client, offer, mockedAddedDocChange)
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
  })
  it('if update fails, do nothing', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    const mockThread = mockPrivateThread(client, mockChannel)
    const offer = setChannelForOffer(mockOffer, mockChannel.id)
    // @ts-ignore
    jest.replaceProperty(mockChannel, 'threads', {
      create: (options) => {
        expect(options.name).toEqual(`Offer-${offer.id}`)
        return Promise.resolve(mockThread)
      }
    })
    // @ts-ignore
    jest.replaceProperty(mockThread, 'members', {
      add: (user) => {
        expect([offer.sender.discordId, offer.receiver.discordId]).toContain(user)
        return Promise.resolve(user as string)
      }
    })
    mockedUpdate.mockImplementationOnce((updatedData) => {
      // @ts-ignore
      expect(updatedData.threadId).toEqual(mockThread.id)
      return Promise.reject(new Error('Test'))
    })
    await offerChangeHandler(client, offer, mockedAddedDocChange)
  })
  it('if update works, thread is creating with proper thread value', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    const mockThread = mockPrivateThread(client, mockChannel)
    const offer = setChannelForOffer(mockOffer, mockChannel.id)
    // @ts-ignore
    jest.replaceProperty(mockChannel, 'threads', {
      create: (options) => {
        expect(options.name).toEqual(`Offer-${offer.id}`)
        return Promise.resolve(mockThread)
      }
    })
    // @ts-ignore
    jest.replaceProperty(mockThread, 'members', {
      add: (user) => {
        expect([offer.sender.discordId, offer.receiver.discordId]).toContain(user)
        return Promise.resolve(user as string)
      }
    })
    // @ts-ignore
    mockedUpdate.mockImplementation(async (updatedData) => {
      // @ts-ignore
      expect(updatedData.threadId).toEqual(mockThread.id)
      return Promise.resolve()
    })
    await offerChangeHandler(client, offer, mockedAddedDocChange)
  })
})
