/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getDiscordChannel } from '../../utils/discord'
import { mockAndSetupChannel, mockTextChannel } from '../../utils/tests/discord/channel-mock'
import { mockClient } from '../../utils/tests/discord/client-mock'
import { mockGuild } from '../../utils/tests/discord/guild-mock'
import { listenToListings } from '../listings'
import { listenToRequestForOffers } from '@echo/firebase-admin'
import { requestsForOffer } from '@echo/model'
import * as utils from '@echo/utils'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Client } from 'discord.js'

jest.mock('@echo/firebase-admin')
jest.mock('../../utils/discord')

// FIXME: some of the tests are not working because of spyOn
describe('listeners - listings', () => {
  const mockRequestForOffer = requestsForOffer['jUzMtPGKM62mMhEcmbN4']!
  // @ts-ignore
  const mockedGetDiscordChannel = jest.mocked(getDiscordChannel)
  const mockedListenToRequestForOffers = jest.mocked(listenToRequestForOffers)

  let client: Client

  beforeEach(() => {
    jest.clearAllMocks()
    client = mockClient()
  })

  it('if getDiscordChannel fails, log an error', () => {
    const mockRequestForOffer = requestsForOffer['jUzMtPGKM62mMhEcmbN4']!
    const mockLogger = jest.spyOn(utils.logger, 'error')
    mockedListenToRequestForOffers.mockImplementationOnce((onChange) =>
      // @ts-ignore
      onChange(mockRequestForOffer, {
        type: 'added',
        doc: {
          ref: {
            // @ts-ignore
            update: jest.fn().mockImplementation(() => {
              expect(false).toBeTruthy()
            })
          }
        }
      })
    )
    mockedGetDiscordChannel.mockRejectedValueOnce('test')
    listenToListings(client)
    mockLogger.mockImplementationOnce((log) => {
      expect(log).toBe(`Error listening to listings: ${JSON.stringify('test')} for listing ${mockRequestForOffer.id}`)
    })
    expect(mockedGetDiscordChannel).toBeCalled()
  })
  it('if request for offer is not added, do nothing', () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    // @ts-ignore
    jest.spyOn(mockChannel, 'send').mockImplementationOnce(() => expect(false).toBeTruthy())
    mockedListenToRequestForOffers.mockImplementationOnce((onChange) =>
      // @ts-ignore
      onChange(mockRequestForOffer, {
        type: 'modified',
        doc: {
          ref: {
            // @ts-ignore
            update: jest.fn().mockImplementation(() => {
              expect(false).toBeTruthy()
            })
          }
        }
      })
    )
    mockedGetDiscordChannel.mockResolvedValue(mockChannel)
    listenToListings(client)
  })
  it('if request for offer is added but posted, do nothing', () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    // @ts-ignore
    jest.spyOn(mockChannel, 'send').mockImplementationOnce(() => expect(false).toBeTruthy())
    mockedListenToRequestForOffers.mockImplementationOnce((onChange) =>
      onChange(
        // @ts-ignore
        { ...mockRequestForOffer, postedAt: 12213 },
        {
          type: 'added',
          doc: {
            ref: {
              // @ts-ignore
              update: jest.fn().mockImplementation(() => {
                expect(false).toBeTruthy()
              })
            }
          }
        }
      )
    )
    mockedGetDiscordChannel.mockResolvedValue(mockChannel)
    listenToListings(client)
  })
  it('if request for offer is valid, send to channel, if error, will log', () => {
    const mockChannel = mockAndSetupChannel(client, mockGuild(client, undefined, { id: '' }))
    jest.spyOn(mockChannel, 'send').mockRejectedValue(new Error('test'))
    mockedListenToRequestForOffers.mockImplementationOnce((onChange) =>
      onChange(
        mockRequestForOffer,
        // @ts-ignore
        {
          type: 'added',
          doc: {
            ref: {
              // @ts-ignore
              update: jest.fn().mockImplementation(() => {
                expect(false).toBeTruthy()
              })
            }
          }
        }
      )
    )
    mockedGetDiscordChannel.mockResolvedValue(mockChannel)

    listenToListings(client)
  })
  it('if request for offer is valid, send to channel, if success, will update', () => {
    const mockChannel = mockTextChannel(client)
    // @ts-ignore
    jest.spyOn(mockChannel, 'send').mockResolvedValue({})

    // @ts-ignore
    mockedListenToRequestForOffers.mockImplementationOnce((onChange) =>
      onChange(
        mockRequestForOffer,
        // @ts-ignore
        {
          type: 'added',
          doc: {
            ref: {
              // @ts-ignore
              update: jest.fn().mockImplementation((date) => {
                expect(date).toBeDefined()
              })
            }
          }
        }
      )
    )
    mockedGetDiscordChannel.mockResolvedValue(mockChannel)
    listenToListings(client)
  })
})
