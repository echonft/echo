import type { CompleteOfferRequest } from '@echo/api/types/requests/complete-offer-request'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { completeOffer } from '@echo/frontend/lib/server/helpers/offer/complete-offer'
import { getOffer } from '@echo/frontend/lib/server/helpers/offer/get-offer'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { completeOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/complete-offer-request-handler'
import { mockRequest } from '@echo/frontend-mocks/request-response'
import { type Offer } from '@echo/model/types/offer'

jest.mock('@echo/frontend/lib/server/helpers/request/get-user-from-request')
jest.mock('@echo/frontend/lib/server/helpers/offer/get-offer')
jest.mock('@echo/frontend/lib/server/helpers/offer/complete-offer')

describe('request-handlers - offer - completeOfferHandler', () => {
  const offerId = 'offerId'
  const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')
  const transactionId = '0x2837ad78e15b9280f522c91c5f5d75a3a2f9f76e'
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if no transaction id is sent', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const req = mockRequest<CompleteOfferRequest>({})
    try {
      await completeOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if transaction id is wrong', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let req = mockRequest<CompleteOfferRequest>({ transactionId: '' })
    try {
      await completeOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req = mockRequest<CompleteOfferRequest>({ transactionId: 'SIGNATURE' })
    try {
      await completeOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getOffer).mockResolvedValueOnce(undefined)
    const req = mockRequest<CompleteOfferRequest>({ transactionId })
    try {
      await completeOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the offer state is not ACCEPTED', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getOffer).mockResolvedValueOnce({ id: offerId, state: 'CANCELLED', expired: false } as Offer)
    let req = mockRequest<CompleteOfferRequest>({ transactionId })
    try {
      await completeOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }

    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getOffer).mockResolvedValueOnce({ id: offerId, state: 'OPEN', expired: false } as Offer)
    req = mockRequest<CompleteOfferRequest>({ transactionId })
    try {
      await completeOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the offer sender', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getOffer).mockResolvedValueOnce({
      id: offerId,
      state: 'ACCEPTED',
      sender: { username: 'another-user-name' },
      expired: false
    } as Offer)
    const req = mockRequest<CompleteOfferRequest>({ transactionId })
    try {
      await completeOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getOffer).mockResolvedValueOnce({
      id: offerId,
      state: 'ACCEPTED',
      sender: { username: 'johnnycagewins' },
      expired: false
    } as Offer)
    jest.mocked(completeOffer).mockResolvedValueOnce()
    const req = mockRequest<CompleteOfferRequest>({ transactionId })
    const res = await completeOfferRequestHandler(req, offerId)
    expect(completeOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
