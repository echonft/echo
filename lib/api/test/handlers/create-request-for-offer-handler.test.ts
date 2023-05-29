/* eslint-disable @typescript-eslint/ban-ts-comment */
import { mapRequestForOfferToResponse } from '../../../mappers/map-request-for-offer-to-response'
import { createRequestForOfferHandler } from '../../src/handlers/request-for-offer/create-request-for-offer-handler'
import { CreateRequestForOfferRequest, RequestForOfferResponse } from '../../src/types'
import { walletsOwnTokens } from '../../src/utils/alchemy/wallets-own-tokens'
import { mockRequestResponse } from '../../src/utils/test/mocks/request-response'
import { mockSession } from '../../src/utils/test/mocks/session'
import { addRequestForOffer, findDiscordGuildByGuildId } from '@echo/firebase-admin'
import * as model from '@echo/model'
import { discordGuilds, nfts, requestsForOffer } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'
import { omit } from 'ramda'

jest.mock('@echo/firebase-admin')
jest.mock('../../../utils/alchemy/wallets-own-tokens')
jest.mock('../../../utils/alchemy/alchemy')

describe('handlers - user - createRequestForOfferHandler', () => {
  const mockedFindDiscordGuildById = jest
    .mocked(findDiscordGuildByGuildId)
    .mockResolvedValue(R.fromNullable(discordGuilds['ncUnbpFfVCofV9bD7ctn']!, new Error()))
  const mockedUserIsInGuild = jest.spyOn(model, 'userIsInGuild').mockReturnValue(true)
  const mockedAddRequestForOffer = jest
    .mocked(addRequestForOffer)
    .mockResolvedValue(R.fromNullable(requestsForOffer['jUzMtPGKM62mMhEcmbN4']!, new Error()))
  const mockedWalletsOwnTokens = jest.mocked(walletsOwnTokens).mockResolvedValue(true)
  const session = mockSession
  const mockedRequest: CreateRequestForOfferRequest = {
    discordGuildId: 'test',
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
      mockedRequest
    )
    mockedFindDiscordGuildById.mockResolvedValueOnce(R.fromNullable(undefined, new Error()))
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
    mockedUserIsInGuild.mockReturnValueOnce(false)
    await createRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'User is not in Discord Guild' })
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
    expect(res._getJSONData()).toEqual({ error: 'Could not create listing' })
  })
  it('if adding listing throws, returns 500', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    mockedAddRequestForOffer.mockRejectedValueOnce(new Error())
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
    mockedAddRequestForOffer.mockResolvedValueOnce(R.fromNullable(undefined, new Error()))
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
    expect(res._getJSONData()).toEqual(mapRequestForOfferToResponse(requestsForOffer['jUzMtPGKM62mMhEcmbN4']!))
  })
  it('if user has no wallets, returns 401', async () => {
    const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    await createRequestForOfferHandler(req, res, { ...session, user: { ...session.user, wallets: undefined } })
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'User does not have wallets' })
  })
})
