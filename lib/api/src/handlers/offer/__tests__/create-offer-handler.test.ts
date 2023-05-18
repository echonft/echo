/* eslint-disable @typescript-eslint/ban-ts-comment */

import { mapOfferItemToItemRequest } from '../../../mappers/map-offer-item-to-item-request'
import { mapOfferToResponse } from '../../../mappers/map-offer-to-response'
import { CreateOfferRequest } from '../../../types/model/requests/create-offer-request'
import { OfferResponse } from '../../../types/model/responses/offer-response'
import { walletsOwnTokens } from '../../../utils/alchemy/wallets-own-tokens'
import { mockRequestResponse } from '../../../utils/test/mocks/request-response'
import { mockSession } from '../../../utils/test/mocks/session'
import { createOfferHandler } from '../create-offer-handler'
import { addOffer, findRequestForOfferById } from '@echo/firebase-admin'
import * as model from '@echo/model'
import { mockOffer, mockOpenRequestForOffer, mockRequestForOffer } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'
import { omit } from 'ramda'

jest.mock('@echo/firebase-admin')
jest.mock('../../../utils/alchemy/wallets-own-tokens')
jest.mock('../../../utils/alchemy/alchemy')

describe('handlers - offer - createOfferHandler', () => {
  const mockedFindRequestForOfferById = jest
    .mocked(findRequestForOfferById)
    .mockResolvedValue(R.fromNullable(mockOpenRequestForOffer, new Error()))
  const mockedUserIsInGuild = jest.spyOn(model, 'userIsInGuild').mockReturnValue(true)
  const mockedAddOffer = jest.mocked(addOffer).mockResolvedValue(R.fromNullable(mockOffer, new Error()))
  const mockedWalletsOwnTokens = jest.mocked(walletsOwnTokens).mockResolvedValue(true)
  const session = mockSession
  const mockedRequestWithRequestForOffer: CreateOfferRequest = {
    receiverItems: mockOffer.receiverItems.map(mapOfferItemToItemRequest),
    senderItems: mockOffer.senderItems.map(mapOfferItemToItemRequest),
    requestForOfferId: mockRequestForOffer.id,
    withRequestForOffer: true
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('if not authenticated, returns 401', async () => {
    const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>('GET')
    await createOfferHandler(req, res, undefined)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'You must be logged in' })
  })
  it('if session with no user, returns 401', async () => {
    const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>('GET')
    // @ts-ignore
    await createOfferHandler(req, res, omit(['user'], session))
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'User not found' })
  })
  it('if user has no wallets, returns 401', async () => {
    const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>(
      'GET',
      undefined,
      mockedRequestWithRequestForOffer
    )
    await createOfferHandler(req, res, { ...session, user: { ...session.user, wallets: undefined } })
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'User does not have wallets' })
  })
  it('if body is invalid, returns 400', async () => {
    const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>('GET')
    // @ts-ignore
    await createOfferHandler(req, res, session)
    expect(res.statusCode).toBe(400)
    expect(res._getJSONData()).toEqual({ error: 'Invalid body' })
  })
  it('if findRequestForOfferById returns an error, returns 500', async () => {
    const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>(
      'GET',
      undefined,
      mockedRequestWithRequestForOffer
    )
    mockedFindRequestForOfferById.mockResolvedValueOnce(R.fromNullable(undefined, new Error()))
    await createOfferHandler(req, res, session)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Request for offer is not found' })
  })
  it('if request for offer is invalid, returns 500', async () => {
    const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>(
      'GET',
      undefined,
      mockedRequestWithRequestForOffer
    )
    mockedFindRequestForOfferById.mockResolvedValueOnce(R.fromNullable(mockRequestForOffer, new Error()))
    await createOfferHandler(req, res, session)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Request for offer cannot accept offers' })
  })
  it('if user not in guild, returns 401', async () => {
    const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>(
      'GET',
      undefined,
      mockedRequestWithRequestForOffer
    )
    mockedUserIsInGuild.mockReturnValueOnce(false)
    await createOfferHandler(req, res, session)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'User is not in Discord Guild' })
  })
  it('if user does not own the NFTs, returns 401', async () => {
    const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>(
      'GET',
      undefined,
      mockedRequestWithRequestForOffer
    )
    mockedWalletsOwnTokens.mockResolvedValueOnce(false)
    await createOfferHandler(req, res, session)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Users do not own all the NFTs to offer' })
  })
  it('if alchemy checks throws, returns 500', async () => {
    const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>(
      'GET',
      undefined,
      mockedRequestWithRequestForOffer
    )
    mockedWalletsOwnTokens.mockRejectedValueOnce('')
    await createOfferHandler(req, res, session)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not create offer' })
  })
  it('if offer listing throws, returns 500', async () => {
    const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>(
      'GET',
      undefined,
      mockedRequestWithRequestForOffer
    )
    mockedAddOffer.mockRejectedValueOnce(new Error())
    await createOfferHandler(req, res, session)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not create offer' })
  })
  it('if adding offer returns an error, return 500', async () => {
    const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>(
      'GET',
      undefined,
      mockedRequestWithRequestForOffer
    )
    mockedAddOffer.mockResolvedValueOnce(R.fromNullable(undefined, new Error()))
    await createOfferHandler(req, res, session)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not create offer' })
  })
  it('if adding offer is successful, returns 200 and the offer object', async () => {
    const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>(
      'GET',
      undefined,
      mockedRequestWithRequestForOffer
    )
    await createOfferHandler(req, res, session)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual(mapOfferToResponse(mockOffer))
  })
})
