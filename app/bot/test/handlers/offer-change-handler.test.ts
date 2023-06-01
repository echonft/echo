/* eslint-disable @typescript-eslint/ban-ts-comment */
import { offerChangeHandler } from '../../src/handlers/offer-change-handler'
import { getDiscordChannel } from '../../src/utils/discord'
import { mockAndSetupChannel, mockPrivateThread } from '../../src/utils/tests/discord/channel-mock'
import { mockClient } from '../../src/utils/tests/discord/client-mock'
import { mockGuild } from '../../src/utils/tests/discord/guild-mock'
import { FirestoreOffer, FirestoreOfferData, offerFirestoreData } from '@echo/firestore'
import { DocumentChange } from '@google-cloud/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Client } from 'discord.js'

jest.mock('@echo/firebase-admin')
jest.mock('../../src/utils/discord')

describe('handlers - listings', () => {
  const mockOffer = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!
  // @ts-ignore
  const mockedGetDiscordChannel = jest.mocked(getDiscordChannel)
  const mockedUpdate = jest.fn((data: FirestoreOfferData) => {
    expect(data).toBeDefined()
  })
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
    expect(mockedGetDiscordChannel).toHaveBeenCalledTimes(0)
  })

  it('if doc is added but already posted, do nothing', async () => {
    await offerChangeHandler(client, { ...mockOffer, postedAt: 1 }, mockedModifiedDocChange)
    expect(mockedGetDiscordChannel).toHaveBeenCalledTimes(0)
  })

  it('if getDiscordChannel fails, do nothing', async () => {
    mockedGetDiscordChannel.mockRejectedValueOnce('test')
    await offerChangeHandler(client, mockOffer, mockedAddedDocChange)
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
  })
  it('if users are not in guild, do nothing', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    mockedGetDiscordChannel.mockResolvedValue(mockChannel)
    const mockedThreadCreation = jest.spyOn(mockChannel.threads, 'create')
    await offerChangeHandler(
      client,
      { ...mockOffer, sender: { ...mockOffer.sender, discordGuilds: [] } },
      mockedAddedDocChange
    )
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
    expect(mockedThreadCreation).toHaveBeenCalledTimes(0)
  })
  it('if thread creation fails, do nothing', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    mockedGetDiscordChannel.mockResolvedValue(mockChannel)
    const mockedThreadCreation = jest.spyOn(mockChannel.threads, 'create').mockRejectedValueOnce(new Error())
    await offerChangeHandler(client, mockOffer, mockedAddedDocChange)
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
    expect(mockedThreadCreation).toHaveBeenCalledTimes(1)
  })
  it('if adding members to thread fails, do nothing', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    const mockThread = mockPrivateThread(client, mockChannel)
    mockedGetDiscordChannel.mockResolvedValue(mockChannel)
    const mockedThreadCreation = jest.spyOn(mockChannel.threads, 'create').mockResolvedValue(mockThread)
    const mockedAddMembers = jest.spyOn(mockThread.members, 'add').mockRejectedValue(new Error())
    await offerChangeHandler(client, mockOffer, mockedAddedDocChange)
    expect(mockedUpdate).toHaveBeenCalledTimes(0)
    expect(mockedThreadCreation).toHaveBeenCalledTimes(1)
    expect(mockedAddMembers).toHaveBeenCalledTimes(2)
  })
  it('if update fails, do nothing', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    const mockThread = mockPrivateThread(client, mockChannel)
    mockedGetDiscordChannel.mockResolvedValue(mockChannel)
    // @ts-ignore
    mockedUpdate.mockRejectedValueOnce(new Error())
    const mockedThreadCreation = jest.spyOn(mockChannel.threads, 'create').mockResolvedValue(mockThread)
    const mockedAddMembers = jest.spyOn(mockThread.members, 'add').mockResolvedValue('test')
    await offerChangeHandler(client, mockOffer, mockedAddedDocChange)
    expect(mockedThreadCreation).toHaveBeenCalledTimes(1)
    expect(mockedAddMembers).toHaveBeenCalledTimes(2)
  })
  it('if update works, thread is creating with proper thread value', async () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    const mockThread = mockPrivateThread(client, mockChannel)
    mockedGetDiscordChannel.mockResolvedValue(mockChannel)

    mockedUpdate.mockImplementation((updatedData) => {
      expect(updatedData.threadId).toEqual(mockThread.id)
    })

    const mockedThreadCreation = jest.spyOn(mockChannel.threads, 'create').mockResolvedValue(mockThread)
    const mockedAddMembers = jest.spyOn(mockThread.members, 'add').mockResolvedValue('test')
    await offerChangeHandler(client, mockOffer, mockedAddedDocChange)
    expect(mockedThreadCreation).toHaveBeenCalledTimes(1)
    expect(mockedAddMembers).toHaveBeenCalledTimes(2)
  })
})
