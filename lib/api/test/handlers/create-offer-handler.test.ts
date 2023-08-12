/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createOfferHandler } from '../../src/handlers/offer/create-offer-handler'
import { mockAddOffer } from '../mocks/firestore/add-offer'
import { mockFindDiscordGuildById } from '../mocks/firestore/find-discord-guild-by-id'
import { mockFindRequestForOfferById } from '../mocks/firestore/find-request-for-offer-by-id'
import { mockFindUserById } from '../mocks/firestore/find-user-by-id'
import { mockUpdateRequestForOfferOffers } from '../mocks/firestore/update-request-for-offer-offers'
import { offerFirestoreData } from '../mocks/offer-firestore-data'
import { requestForOfferFirestoreData } from '../mocks/request-for-offer-firestore-data'
import { mockRequestResponse } from '../mocks/request-response'
import { mockSession } from '../mocks/session'
import { CreateOfferRequest, OfferResponse } from '@echo/api-public'
import {
  addOffer,
  findDiscordGuildById,
  findRequestForOfferById,
  findUserById,
  updateRequestForOfferOffers
} from '@echo/firestore'
import { RequestForOfferState } from '@echo/ui'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import dayjs from 'dayjs'
import { omit } from 'ramda'

jest.mock('@echo/firestore')
jest.mock('../../src/utils/handler/create-offer-from-data')

describe('handlers - offer - createOfferHandler', () => {
  const mockedFindRequestForOfferById = jest
    .mocked(findRequestForOfferById)
    .mockImplementation(mockFindRequestForOfferById)
  jest.mocked(findUserById).mockImplementation(mockFindUserById)
  jest.mocked(findDiscordGuildById).mockImplementation(mockFindDiscordGuildById)
  jest.mocked(addOffer).mockImplementation(mockAddOffer)
  jest.mocked(updateRequestForOfferOffers).mockImplementation(mockUpdateRequestForOfferOffers)

  const mockOffer = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!
  const mockRequestForOffer = requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!
  const mockOpenRequestForOffer = {
    ...mockRequestForOffer,
    expiresAt: dayjs().add(1, 'day').unix(),
    state: RequestForOfferState.CREATED,
    activities: [mockRequestForOffer.activities[0]!]
  }
  const session = mockSession
  const mockedRequestWithRequestForOffer: CreateOfferRequest = {
    receiverItems: mockOffer.receiverItems.map((nft) => nft.id),
    senderItems: mockOffer.senderItems.map((nft) => nft.id),
    requestForOfferId: mockRequestForOffer.id,
    withRequestForOffer: true
  }
  const mockedRequestWithoutRequestForOffer: CreateOfferRequest = {
    receiverItems: mockOffer.receiverItems.map((nft) => nft.id),
    senderItems: mockOffer.senderItems.map((nft) => nft.id),
    receiverId: mockOffer.receiver.id,
    discordGuildId: mockOffer.discordGuild.id,
    withRequestForOffer: false
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
    // @ts-ignore
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
  describe('With Request For Offer', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })
    it('if findRequestForOfferById returns an error, returns 500', async () => {
      const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>('GET', undefined, {
        ...mockedRequestWithRequestForOffer,
        requestForOfferId: 'invalid'
      })
      await createOfferHandler(req, res, session)
      expect(res.statusCode).toBe(500)
      expect(res._getJSONData()).toEqual({ error: 'Request for offer is not found' })
    })
    it('if findRequestForOfferById rejects, returns 500', async () => {
      const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>('GET', undefined, {
        ...mockedRequestWithRequestForOffer,
        requestForOfferId: 'reject'
      })
      await createOfferHandler(req, res, session)
      expect(res.statusCode).toBe(500)
      expect(res._getJSONData()).toEqual({ error: 'Request for offer is not found' })
    })
    it('if findRequestForOfferById is invalid, returns 400', async () => {
      const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>('GET', undefined, {
        ...mockedRequestWithRequestForOffer,
        requestForOfferId: 'throw'
      })
      await createOfferHandler(req, res, session)
      expect(res.statusCode).toBe(400)
      expect(res._getJSONData()).toEqual({ error: 'Invalid body' })
    })
    it('if Request for offer is invalid, returns 500', async () => {
      const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>(
        'GET',
        undefined,
        mockedRequestWithRequestForOffer
      )
      await createOfferHandler(req, res, session)
      expect(res.statusCode).toBe(500)
      expect(res._getJSONData()).toEqual({ error: 'Request for offer cannot accept offers' })
    })
    it('if adding offer is successful, returns 200 and the offer object', async () => {
      const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>(
        'GET',
        undefined,
        mockedRequestWithRequestForOffer
      )
      mockedFindRequestForOfferById.mockReturnValueOnce(Promise.resolve(mockOpenRequestForOffer))
      await createOfferHandler(req, res, session)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual(mockOffer)
    })
  })
  describe('Without Request For Offer', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })
    it('if findUserById rejects, returns 500', async () => {
      const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>('GET', undefined, {
        ...mockedRequestWithoutRequestForOffer,
        receiverId: 'reject'
      })
      await createOfferHandler(req, res, session)
      expect(res.statusCode).toBe(500)
      expect(res._getJSONData()).toEqual({ error: 'Could not create offer' })
    })
    it('if findUserById is invalid, returns 500', async () => {
      const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>('GET', undefined, {
        ...mockedRequestWithoutRequestForOffer,
        receiverId: 'wrong'
      })
      await createOfferHandler(req, res, session)
      expect(res.statusCode).toBe(500)
      expect(res._getJSONData()).toEqual({ error: 'Could not create offer' })
    })
    it('if findUserById throws, returns 400', async () => {
      const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>('GET', undefined, {
        ...mockedRequestWithoutRequestForOffer,
        receiverId: 'throw'
      })
      await createOfferHandler(req, res, session)
      expect(res.statusCode).toBe(400)
      expect(res._getJSONData()).toEqual({ error: 'Invalid body' })
    })
    it('if findDiscordGuildById rejects, returns 500', async () => {
      const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>('GET', undefined, {
        ...mockedRequestWithoutRequestForOffer,
        discordGuildId: 'reject'
      })
      await createOfferHandler(req, res, session)
      expect(res.statusCode).toBe(500)
      expect(res._getJSONData()).toEqual({ error: 'Could not create offer' })
    })
    it('if findDiscordGuildById is invalid, returns 500', async () => {
      const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>('GET', undefined, {
        ...mockedRequestWithoutRequestForOffer,
        discordGuildId: 'wrong'
      })
      await createOfferHandler(req, res, session)
      expect(res.statusCode).toBe(500)
      expect(res._getJSONData()).toEqual({ error: 'Could not create offer' })
    })
    it('if findDiscordGuildById throws, returns 400', async () => {
      const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>('GET', undefined, {
        ...mockedRequestWithoutRequestForOffer,
        discordGuildId: 'throw'
      })
      await createOfferHandler(req, res, session)
      expect(res.statusCode).toBe(400)
      expect(res._getJSONData()).toEqual({ error: 'Invalid body' })
    })
    it('if findDiscordGuildById and findUserById are invalid, returns 500', async () => {
      const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>('GET', undefined, {
        ...mockedRequestWithoutRequestForOffer,
        discordGuildId: 'reject',
        receiverId: 'reject'
      })
      await createOfferHandler(req, res, session)
      expect(res.statusCode).toBe(500)
      expect(res._getJSONData()).toEqual({ error: 'Could not create offer' })
    })

    it('if adding offer is successful, returns 200 and the offer object', async () => {
      const { req, res } = mockRequestResponse<CreateOfferRequest, never, OfferResponse>(
        'GET',
        undefined,
        mockedRequestWithoutRequestForOffer
      )
      await createOfferHandler(req, res, session)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual(mockOffer)
    })
  })
})
