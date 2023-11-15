import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { cancelOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/cancel-offer-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { OFFER_STATE_CANCELLED } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { assoc, modify } from 'ramda'

jest.mock('@echo/frontend/lib/server/helpers/request/get-user-from-request')
jest.mock('@echo/firestore/crud/offer/find-offer-by-id')
jest.mock('@echo/firestore/crud/offer/cancel-offer')

describe('request-handlers - offer - cancelOfferRequestHandler', () => {
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
  const offer = getOfferMockById(offerId)
  const user = getUserMockById('6rECUMhevHfxABZ1VNOm')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(findOfferById).mockResolvedValueOnce(undefined)
    const req = mockRequest<never>()
    try {
      await cancelOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the offer state is not OPEN or ACCEPTED', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(findOfferById).mockResolvedValueOnce(assoc('state', OFFER_STATE_CANCELLED, offer))
    const req = mockRequest<never>()
    try {
      await cancelOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the offer sender', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest
      .mocked(findOfferById)
      .mockResolvedValueOnce(modify<Offer, 'sender', User>('sender', assoc('username', 'another-user'), offer))
    const req = mockRequest<never>()
    try {
      await cancelOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(findOfferById).mockResolvedValueOnce(offer)
    const updatedOffer = assoc('state', OFFER_STATE_CANCELLED, offer)
    jest.mocked(cancelOffer).mockResolvedValueOnce(updatedOffer)
    const req = mockRequest<never>()
    const res = await cancelOfferRequestHandler(req, offerId)
    expect(cancelOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as OfferResponse
    expect(responseData).toEqual({ offer: updatedOffer })
  })
})
