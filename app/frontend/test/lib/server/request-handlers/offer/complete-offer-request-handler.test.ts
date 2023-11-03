import type { CompleteOfferRequest } from '@echo/api/types/requests/complete-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { completeOffer } from '@echo/frontend/lib/server/helpers/offer/complete-offer'
import { getOffer } from '@echo/frontend/lib/server/helpers/offer/get-offer'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { completeOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/complete-offer-request-handler'
import { mockRequest } from '@echo/frontend-mocks/request-response'
import { type Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { assoc, modify } from 'ramda'

jest.mock('@echo/frontend/lib/server/helpers/request/get-user-from-request')
jest.mock('@echo/frontend/lib/server/helpers/offer/get-offer')
jest.mock('@echo/frontend/lib/server/helpers/offer/complete-offer')

describe('request-handlers - offer - completeOfferHandler', () => {
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
  const offer = assoc('state', 'ACCEPTED', getOfferMockById(offerId))
  const user = getUserMockById('6rECUMhevHfxABZ1VNOm')
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
    jest.mocked(getOffer).mockResolvedValueOnce(assoc('state', 'CANCELLED', offer))
    const req = mockRequest<CompleteOfferRequest>({ transactionId })
    try {
      await completeOfferRequestHandler(req, offerId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the offer sender', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest
      .mocked(getOffer)
      .mockResolvedValueOnce(modify<Offer, 'sender', User>('sender', assoc('username', 'another-user'), offer))
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
    jest.mocked(getOffer).mockResolvedValueOnce(assoc('state', 'ACCEPTED', offer))
    const updatedOffer = assoc('state', 'COMPLETED', offer)
    jest.mocked(completeOffer).mockResolvedValueOnce(updatedOffer)
    const req = mockRequest<CompleteOfferRequest>({ transactionId })
    const res = await completeOfferRequestHandler(req, offerId)
    expect(completeOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as OfferResponse
    expect(responseData).toEqual({ offer: updatedOffer })
  })
})
