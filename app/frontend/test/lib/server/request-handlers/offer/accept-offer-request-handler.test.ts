import type { AcceptOfferRequest } from '@echo/api/types/requests/accept-offer-request'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { acceptOffer } from '@echo/frontend/lib/server/helpers/offer/accept-offer'
import { getOffer } from '@echo/frontend/lib/server/helpers/offer/get-offer'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { acceptOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/accept-offer-request-handler'
import { mockRequest } from '@echo/frontend-mocks/request-response'
import { type Offer } from '@echo/model/types/offer'

jest.mock('@echo/frontend/lib/server/helpers/request/get-user-from-request')
jest.mock('@echo/frontend/lib/server/helpers/offer/get-offer')
jest.mock('@echo/frontend/lib/server/helpers/offer/accept-offer')

describe('request-handlers - offer - acceptOfferRequestHandler', () => {
  const offerId = 'offerId'
  const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')
  const signature =
    '0x4d374b2212ea29483f6aba22a36bd9706fa410aa20e9954e39e407fd8018370a2315258d336fafca5c5a826dd992a91bca81e1d920d4bcc4bceee95b26682c7e1b'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if no signature is sent', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const req = mockRequest<AcceptOfferRequest>({})
    try {
      await acceptOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if signature is wrong', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let req = mockRequest<AcceptOfferRequest>({ signature: '' })
    try {
      await acceptOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req = mockRequest<AcceptOfferRequest>({ signature: 'SIGNATURE' })
    try {
      await acceptOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getOffer).mockResolvedValueOnce(undefined)
    const req = mockRequest<AcceptOfferRequest>({ signature })
    try {
      await acceptOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the offer state is not OPEN', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getOffer).mockResolvedValueOnce({ id: offerId, state: 'CANCELLED', expired: false } as Offer)
    const req = mockRequest<AcceptOfferRequest>({ signature })
    try {
      await acceptOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the offer receiver', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getOffer).mockResolvedValueOnce({
      id: offerId,
      state: 'OPEN',
      receiver: { username: 'another-user-name' },
      expired: false
    } as Offer)
    const req = mockRequest<AcceptOfferRequest>({ signature })
    try {
      await acceptOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getOffer).mockResolvedValueOnce({
      id: offerId,
      state: 'OPEN',
      receiver: { username: 'johnnycagewins' },
      expired: false
    } as Offer)
    jest.mocked(acceptOffer).mockResolvedValueOnce()
    const req = mockRequest<AcceptOfferRequest>({ signature })
    const res = await acceptOfferRequestHandler(req, offerId)
    expect(acceptOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
