import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import type { Offer } from '@echo/model/types/offer'
import { ApiError } from '@server/helpers/error/api-error'
import { cancelOffer } from '@server/helpers/offer/cancel-offer'
import { getOffer } from '@server/helpers/offer/get-offer'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { cancelOfferRequestHandler } from '@server/request-handlers/offer/cancel-offer-request-handler'
import { mockRequest } from '@server-mocks/request-response'

jest.mock('@server/helpers/request/get-user-from-request')
jest.mock('@server/helpers/offer/get-offer')
jest.mock('@server/helpers/offer/cancel-offer')

describe('request-handlers - offer - cancelOfferRequestHandler', () => {
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
      await cancelOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the offer state is not OPEN or ACCEPTED', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getOffer).mockResolvedValueOnce({ id: offerId, state: 'CANCELLED' } as Offer)
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
    jest.mocked(getOffer).mockResolvedValueOnce({ state: 'OPEN', sender: { username: 'another-user-name' } } as Offer)
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
    jest.mocked(getOffer).mockResolvedValueOnce({ state: 'ACCEPTED', sender: { username: 'johnnycagewins' } } as Offer)
    jest.mocked(cancelOffer).mockResolvedValueOnce()
    const req = mockRequest<never>()
    const res = await cancelOfferRequestHandler(req, offerId)
    expect(cancelOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
