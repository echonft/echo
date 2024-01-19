import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { rejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { rejectOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/reject-offer-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { OFFER_STATE_ACCEPTED, OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { assoc, modify } from 'ramda'

jest.mock('@echo/firestore/crud/offer/find-offer-by-id')
jest.mock('@echo/firestore/crud/offer/reject-offer')

describe('request-handlers - offer - rejectOfferRequestHandler', () => {
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
  const offer = getOfferMockById(offerId)
  const user = getAuthUserMockByUsername('johnnycagewins')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(findOfferById).mockResolvedValueOnce(undefined)
    const req = mockRequest<never>()
    try {
      await rejectOfferRequestHandler(user, req, { id: offerId })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the offer state is read only', async () => {
    jest.mocked(findOfferById).mockResolvedValueOnce(assoc('readOnly', true, offer))
    const req = mockRequest<never>()
    try {
      await rejectOfferRequestHandler(user, req, { id: offerId })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the offer state is not OPEN', async () => {
    jest.mocked(findOfferById).mockResolvedValueOnce(assoc('state', OFFER_STATE_ACCEPTED, offer))
    const req = mockRequest<never>()
    try {
      await rejectOfferRequestHandler(user, req, { id: offerId })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the offer receiver', async () => {
    jest
      .mocked(findOfferById)
      .mockResolvedValueOnce(modify<Offer, 'receiver', User>('receiver', assoc('username', 'another-user'), offer))
    const req = mockRequest<never>()
    try {
      await rejectOfferRequestHandler(user, req, { id: offerId })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200', async () => {
    jest.mocked(findOfferById).mockResolvedValueOnce(offer)
    const updatedOffer = assoc('state', OFFER_STATE_REJECTED, offer)
    jest.mocked(rejectOffer).mockResolvedValueOnce(updatedOffer)
    const req = mockRequest<never>()
    const res = await rejectOfferRequestHandler(user, req, { id: offerId })
    expect(rejectOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as OfferResponse
    expect(responseData).toEqual({ offer: updatedOffer })
  })
})
