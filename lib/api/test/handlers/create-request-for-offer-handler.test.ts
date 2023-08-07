/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createRequestForOfferHandler } from '../../src/handlers/request-for-offer/create-request-for-offer-handler'
import { mockAreNftsOwnedByWallets } from '../../src/mocks/alchemy/are-nfts-owned-by-wallets'
import { mockAddRequestForOffer } from '../../src/mocks/firebase-admin/add-request-for-offer'
import { mockFindDiscordGuildById } from '../../src/mocks/firebase-admin/find-discord-guild-by-id'
import { mockFindNftsByIds } from '../../src/mocks/firebase-admin/find-nfts-by-ids'
import { promiseResultError } from '../../src/mocks/promise-result-error'
import { promiseResultRejecter } from '../../src/mocks/promise-result-rejecter'
import {
  CreateRequestForOfferRequest,
  mockRequestResponse,
  mockSession,
  RequestForOfferResponse
} from '@echo/api-public'
import { addRequestForOffer, findDiscordGuildByGuildId, findNftsByIds } from '@echo/firebase-admin'
import { requestForOfferFirestoreData } from '@echo/firestore'
import { nfts } from '@echo/model'
import { errorPromise } from '@echo/utils'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { omit } from 'ramda'

jest.mock('@echo/firebase-admin')
jest.mock('@echo/alchemy', () => ({
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  areNftsOwnedByWallets: (arg) => mockAreNftsOwnedByWallets(arg)
}))

describe('handlers - user - createRequestForOfferHandler', () => {
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
    // @ts-ignore
    await createRequestForOfferHandler(req, res, {
      ...session,
      user: { ...session.user, wallets: [{ address: 'error', chainId: 1 }] }
    })
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'User does not own all the NFTs to offer' })
  })
  it('if alchemy checks throws, returns 500', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    await createRequestForOfferHandler(req, res, {
      ...session,
      user: { ...session.user, wallets: [{ address: 'reject', chainId: 1 }] }
    })
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Error fetching NFTs' })
  })
  it('if adding listing throws, returns 500', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    mockedAddRequestForOffer.mockImplementationOnce(errorPromise('error'))
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
    mockedAddRequestForOffer.mockImplementationOnce(errorPromise('error'))
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
