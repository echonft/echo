import { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import type { AuthUser } from '@echo/ui/types/model/auth-user'
import { ApiError } from '@server/helpers/error/api-error'
import { getOffer } from '@server/helpers/offer/get-offer'
import { rejectOffer } from '@server/helpers/offer/reject-offer'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { rejectOfferRequestHandler } from '@server/request-handlers/offer/reject-offer-request-handler'
import { mockRequest } from '@server-mocks/request-response'

jest.mock('@server/helpers/request/get-user-from-request')
jest.mock('@server/helpers/offer/get-offer')
jest.mock('@server/helpers/offer/reject-offer')

describe('request-handlers - offer - rejectOfferRequestHandler', () => {
  const offerId = 'offerId'
  const user: AuthUser = {
    id: 'user-id',
    name: 'user-name',
    image: 'user-image'
  }

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
    jest.mocked(getOffer).mockResolvedValueOnce({ id: offerId, state: 'CANCELLED' } as FirestoreOffer)
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
      .mocked(getOffer)
      .mockResolvedValueOnce({ state: 'OPEN', receiver: { username: 'another-user-name' } } as FirestoreOffer)
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
    jest
      .mocked(getOffer)
      .mockResolvedValueOnce({ state: 'OPEN', receiver: { username: 'user-name' } } as FirestoreOffer)
    jest.mocked(rejectOffer).mockResolvedValueOnce()
    const req = mockRequest<never>()
    const res = await rejectOfferRequestHandler(req, offerId)
    expect(rejectOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
