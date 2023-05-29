/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createOfferHandler } from '../../src/handlers/offer/create-offer-handler'
import { CreateOfferRequest } from '../../src/types/model/requests/create-offer-request'
import { OfferResponse } from '../../src/types/model/responses/offer-response'
import { mockAddOffer } from '../../src/utils/test/mocks/firebase-admin/add-offer'
import { mockFindDiscordGuildById } from '../../src/utils/test/mocks/firebase-admin/find-discord-guild-by-id'
import { mockFindRequestForOfferById } from '../../src/utils/test/mocks/firebase-admin/find-request-for-offer-by-id'
import { mockFindUserById } from '../../src/utils/test/mocks/firebase-admin/find-user-by-id'
import { mockUpdateRequestForOfferOffers } from '../../src/utils/test/mocks/firebase-admin/update-request-for-offer-offers'
import { mockRequestResponse } from '../../src/utils/test/mocks/request-response'
import { mockSession } from '../../src/utils/test/mocks/session'
import {
  addOffer,
  findDiscordGuildById,
  findRequestForOfferById,
  findUserById,
  updateRequestForOfferOffers
} from '@echo/firebase-admin'
import { offerFirestoreData, requestForOfferFirestoreData } from '@echo/firestore'
import { RequestForOfferState } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'
import dayjs from 'dayjs'
import { omit } from 'ramda'

jest.mock('@echo/firebase-admin')
jest.mock('../../src/utils/alchemy/wallets-own-tokens')
jest.mock('../../src/utils/alchemy/alchemy')
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
      mockedFindRequestForOfferById.mockReturnValueOnce(R.fromPromise(Promise.resolve(mockOpenRequestForOffer)))
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
