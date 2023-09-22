import { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import type { AuthUser } from '@echo/ui/types/model/auth-user'
import { ApiError } from '@server/helpers/error/api-error'
import { acceptOffer } from '@server/helpers/offer/accept-offer'
import { getOffer } from '@server/helpers/offer/get-offer'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { acceptOfferRequestHandler } from '@server/request-handlers/offer/accept-offer-request-handler'
import { mockRequest } from '@server-mocks/request-response'

jest.mock('@server/helpers/request/get-user-from-request')
jest.mock('@server/helpers/offer/get-offer')
jest.mock('@server/helpers/offer/accept-offer')

describe('request-handlers - offer - acceptOfferRequestHandler', () => {
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
      await acceptOfferRequestHandler(req, offerId)
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
      await acceptOfferRequestHandler(req, offerId)
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
      await acceptOfferRequestHandler(req, offerId)
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
    jest.mocked(acceptOffer).mockResolvedValueOnce()
    const req = mockRequest<never>()
    const res = await acceptOfferRequestHandler(req, offerId)
    expect(acceptOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
