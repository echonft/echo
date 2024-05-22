import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import { cancelOfferRequestHandler } from '@echo/frontend/lib/request-handlers/offer/cancel-offer-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { OFFER_STATE_CANCELLED } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { assoc, modify } from 'ramda'

jest.mock('@echo/firestore/crud/offer/get-offer-by-id')
jest.mock('@echo/firestore/crud/offer/cancel-offer')

describe('request-handlers - offer - cancelOfferRequestHandler', () => {
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
  const offer = getOfferMockById(offerId)
  const user = getAuthUserMockByUsername('crewnft_')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getOfferById).mockResolvedValueOnce(undefined)
    const req = mockRequest<never>()
    try {
      await cancelOfferRequestHandler(user, req, { id: offerId })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the offer state is read only', async () => {
    jest.mocked(getOfferById).mockResolvedValueOnce(assoc('readOnly', true, offer))
    const req = mockRequest<never>()
    try {
      await cancelOfferRequestHandler(user, req, { id: offerId })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the offer sender', async () => {
    jest
      .mocked(getOfferById)
      .mockResolvedValueOnce(modify<Offer, 'sender', User>('sender', assoc('username', 'another-user'), offer))
    const req = mockRequest<never>()
    try {
      await cancelOfferRequestHandler(user, req, { id: offerId })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200', async () => {
    jest.mocked(getOfferById).mockResolvedValueOnce(offer)
    const updatedOffer = assoc('state', OFFER_STATE_CANCELLED, offer)
    jest.mocked(cancelOffer).mockResolvedValueOnce(updatedOffer)
    const req = mockRequest<never>()
    const res = await cancelOfferRequestHandler(user, req, { id: offerId })
    expect(cancelOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as OfferResponse
    expect(responseData).toEqual({ offer: updatedOffer })
  })
})
