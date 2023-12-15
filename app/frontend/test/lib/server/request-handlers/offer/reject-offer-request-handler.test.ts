import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { rejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { rejectOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/reject-offer-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { OFFER_STATE_CANCELLED, OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { assoc, modify } from 'ramda'

jest.mock('@echo/frontend/lib/server/helpers/request/get-user-from-request')
jest.mock('@echo/firestore/crud/offer/find-offer-by-id')
jest.mock('@echo/firestore/crud/offer/reject-offer')

describe('request-handlers - offer - rejectOfferRequestHandler', () => {
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
  const offer = getOfferMockById(offerId)
  const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(findOfferById).mockResolvedValueOnce(undefined)
    const req = mockRequest<never>()
    try {
      await rejectOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the offer state is not OPEN', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(findOfferById).mockResolvedValueOnce(assoc('state', OFFER_STATE_CANCELLED, offer))
    const req = mockRequest<never>()
    try {
      await rejectOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the offer receiver', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest
      .mocked(findOfferById)
      .mockResolvedValueOnce(modify<Offer, 'receiver', User>('receiver', assoc('username', 'another-user'), offer))
    const req = mockRequest<never>()
    try {
      await rejectOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(findOfferById).mockResolvedValueOnce(offer)
    const updatedOffer = assoc('state', OFFER_STATE_REJECTED, offer)
    jest.mocked(rejectOffer).mockResolvedValueOnce(updatedOffer)
    const req = mockRequest<never>()
    const res = await rejectOfferRequestHandler(req, offerId)
    expect(rejectOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as OfferResponse
    expect(responseData).toEqual({ offer: updatedOffer })
  })
})
