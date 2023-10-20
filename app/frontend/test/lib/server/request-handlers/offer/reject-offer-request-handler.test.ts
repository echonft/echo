import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { getOffer } from '@echo/frontend/lib/server/helpers/offer/get-offer'
import { rejectOffer } from '@echo/frontend/lib/server/helpers/offer/reject-offer'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { rejectOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/reject-offer-request-handler'
import { mockRequest } from '@echo/frontend-mocks/request-response'
import { type Offer } from '@echo/model/types/offer'

jest.mock('@server/helpers/request/get-user-from-request')
jest.mock('@server/helpers/offer/get-offer')
jest.mock('@server/helpers/offer/reject-offer')

describe('request-handlers - offer - rejectOfferRequestHandler', () => {
  const offerId = 'offerId'
  const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getOffer).mockResolvedValueOnce(undefined)
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
    jest.mocked(getOffer).mockResolvedValueOnce({ id: offerId, expired: false, state: 'CANCELLED' } as Offer)
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
    jest.mocked(getOffer).mockResolvedValueOnce({
      id: offerId,
      expired: false,
      state: 'OPEN',
      receiver: { username: 'another-user-name' }
    } as Offer)
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
    jest.mocked(getOffer).mockResolvedValueOnce({
      id: offerId,
      expired: false,
      state: 'OPEN',
      receiver: { username: 'johnnycagewins' }
    } as Offer)
    jest.mocked(rejectOffer).mockResolvedValueOnce()
    const req = mockRequest<never>()
    const res = await rejectOfferRequestHandler(req, offerId)
    expect(rejectOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
