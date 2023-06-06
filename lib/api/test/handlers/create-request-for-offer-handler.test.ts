/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createRequestForOfferHandler } from '../../src/handlers/request-for-offer/create-request-for-offer-handler'
import { CreateRequestForOfferRequest, RequestForOfferResponse } from '../../src/types'
import * as walletOwnToken from '../../src/utils/alchemy/wallets-own-tokens'
import { mockAddRequestForOffer } from '../../src/utils/test/mocks/firebase-admin/add-request-for-offer'
import { mockFindDiscordGuildById } from '../../src/utils/test/mocks/firebase-admin/find-discord-guild-by-id'
import { mockFindNftsByIds } from '../../src/utils/test/mocks/firebase-admin/find-nfts-by-ids'
import { promiseResultError } from '../../src/utils/test/mocks/promise-result-error'
import { promiseResultRejecter } from '../../src/utils/test/mocks/promise-result-rejecter'
import { mockRequestResponse } from '../../src/utils/test/mocks/request-response'
import { mockSession } from '../../src/utils/test/mocks/session'
import { addRequestForOffer, findDiscordGuildByGuildId, findNftsByIds } from '@echo/firebase-admin'
import { requestForOfferFirestoreData } from '@echo/firestore'
import { nfts } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { omit } from 'ramda'

jest.mock('@echo/firebase-admin')
jest.mock('../../src/utils/alchemy/wallets-own-tokens')
jest.mock('../../src/utils/alchemy/alchemy')

describe('handlers - user - createRequestForOfferHandler', () => {
  let mockedWalletsOwnTokens = jest
    .spyOn(walletOwnToken, 'walletsOwnTokens')
    .mockImplementation(() => Promise.resolve(true))
  const mockedAddRequestForOffer = jest.mocked(addRequestForOffer).mockImplementation(mockAddRequestForOffer)
  jest.mocked(findDiscordGuildByGuildId).mockImplementation(mockFindDiscordGuildById)
  jest.mocked(findNftsByIds).mockImplementation(mockFindNftsByIds)
  const session = mockSession
  const mockedRequest: CreateRequestForOfferRequest = {
    // NOTE We use the id directly here for testing
    discordGuildId: 'ncUnbpFfVCofV9bD7ctn',
    items: [nfts['QFjMRNChUAHNswkRADXh']!.id],
    target: [{ chainId: 1, address: '0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B' }]
  }
  beforeEach(() => {
    jest.clearAllMocks()
    mockedWalletsOwnTokens = jest
      .spyOn(walletOwnToken, 'walletsOwnTokens')
      .mockImplementation(() => Promise.resolve(true))
  })

  it('if not authenticated, returns 401', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>('GET')
    await createRequestForOfferHandler(req, res, undefined)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'You must be logged in' })
  })
  it('if session with no user, returns 401', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>('GET')
    // @ts-ignore
    await createRequestForOfferHandler(req, res, omit(['user'], session))
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'User not found' })
  })
  it('if body is invalid, returns 400', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>('GET')
    // @ts-ignore
    await createRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(400)
    expect(res._getJSONData()).toEqual({ error: 'Invalid body' })
  })
  it('if guild is not found, returns 500', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      { ...mockedRequest, discordGuildId: 'test' }
    )
    await createRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Discord Guild not found' })
  })
  it('if user not in guild, returns 401', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    await createRequestForOfferHandler(req, res, { ...session, user: { ...session.user, discordGuilds: [] } })
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'User is not in Discord Guild' })
  })
  it('if findNftsByIds rejects, returns 500', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      { ...mockedRequest, items: ['reject'] }
    )
    await createRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Error fetching NFTs' })
  })
  it('if findNftsByIds returns an error, returns 500', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      { ...mockedRequest, items: ['wrongId'] }
    )
    await createRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Error fetching NFTs' })
  })
  it('if user does not own the NFTs, returns 401', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    mockedWalletsOwnTokens.mockResolvedValueOnce(false)
    await createRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'User does not own all the NFTs to offer' })
  })
  it('if alchemy checks throws, returns 500', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    mockedWalletsOwnTokens.mockRejectedValueOnce('')
    await createRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Error fetching NFTs' })
  })
  it('if adding listing throws, returns 500', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    mockedAddRequestForOffer.mockImplementationOnce(promiseResultRejecter)
    await createRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not create listing' })
  })
  it('if adding listings returns an error, return 500', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    mockedAddRequestForOffer.mockImplementationOnce(promiseResultError)
    await createRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not create listing' })
  })
  it('if adding listings is successful, returns 200 and the request for offer object', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    await createRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual(requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!)
  })
  it('if user has no wallets, returns 401', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    await createRequestForOfferHandler(req, res, { ...session, user: { ...session.user, wallets: [] } })
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'User does not have wallets' })
  })
})
