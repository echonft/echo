import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { guarded_findOfferById } from '@echo/frontend/lib/server/helpers/offer/guarded_find-offer-by-id'
import { guarded_rejectOffer } from '@echo/frontend/lib/server/helpers/offer/guarded_reject-offer'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { rejectOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/reject-offer-request-handler'
import { mockRequest } from '@echo/frontend-mocks/request-response'
import { type Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { assoc, modify } from 'ramda'

jest.mock('@echo/frontend/lib/server/helpers/request/get-user-from-request')
jest.mock('@echo/frontend/lib/server/helpers/offer/guarded_find-offer-by-id')
jest.mock('@echo/frontend/lib/server/helpers/offer/guarded_reject-offer')

describe('request-handlers - offer - rejectOfferRequestHandler', () => {
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
  const offer = getOfferMockById(offerId)
  const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(guarded_findOfferById).mockResolvedValueOnce(undefined)
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
    jest.mocked(guarded_findOfferById).mockResolvedValueOnce(assoc('state', 'CANCELLED', offer))
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
      .mocked(guarded_findOfferById)
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
    jest.mocked(guarded_findOfferById).mockResolvedValueOnce(offer)
    const updatedOffer = assoc('state', 'REJECTED', offer)
    jest.mocked(guarded_rejectOffer).mockResolvedValueOnce(updatedOffer)
    const req = mockRequest<never>()
    const res = await rejectOfferRequestHandler(req, offerId)
    expect(guarded_rejectOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as OfferResponse
    expect(responseData).toEqual({ offer: updatedOffer })
  })
})
