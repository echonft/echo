import type { AcceptOfferRequest } from '@echo/api/types/requests/accept-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { acceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUserDocumentDataMockById } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-id'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import { acceptOfferRequestHandler } from '@echo/frontend/lib/request-handlers/offer/accept-offer-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { OFFER_STATE_ACCEPTED } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { assoc, modify } from 'ramda'

jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/offer/get-offer-by-id')
jest.mock('@echo/firestore/crud/offer/accept-offer')

describe('request-handlers - offer - acceptOfferRequestHandler', () => {
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
  const offer = getOfferMockById(offerId)
  const signature =
    '0x4d374b2212ea29483f6aba22a36bd9706fa410aa20e9954e39e407fd8018370a2315258d336fafca5c5a826dd992a91bca81e1d920d4bcc4bceee95b26682c7e1b'
  const user = getAuthUserMockByUsername('johnnycagewins')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if no signature is sent', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const req = mockRequest<AcceptOfferRequest>({})
    try {
      await acceptOfferRequestHandler(user, req, { id: offerId })
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
      await acceptOfferRequestHandler(user, req, { id: offerId })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req = mockRequest<AcceptOfferRequest>({ signature: 'SIGNATURE' })
    try {
      await acceptOfferRequestHandler(user, req, { id: offerId })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the offer does not exist', async () => {
    const req = mockRequest<AcceptOfferRequest>({ signature })
    jest.mocked(getOfferById).mockResolvedValueOnce(undefined)
    try {
      await acceptOfferRequestHandler(user, req, { id: offerId })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the offer is read only', async () => {
    jest.mocked(getOfferById).mockResolvedValueOnce(assoc('readOnly', true, offer))
    const req = mockRequest<AcceptOfferRequest>({ signature })
    try {
      await acceptOfferRequestHandler(user, req, { id: offerId })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the offer state is not OPEN', async () => {
    jest.mocked(getOfferById).mockResolvedValueOnce(assoc('state', OFFER_STATE_ACCEPTED, offer))
    const req = mockRequest<AcceptOfferRequest>({ signature })
    try {
      await acceptOfferRequestHandler(user, req, { id: offerId })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the offer receiver', async () => {
    jest
      .mocked(getOfferById)
      .mockResolvedValueOnce(modify<Offer, 'receiver', User>('receiver', assoc('username', 'another-user'), offer))
    const req = mockRequest<AcceptOfferRequest>({ signature })
    try {
      await acceptOfferRequestHandler(user, req, { id: offerId })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200', async () => {
    jest.mocked(getUserByUsername).mockResolvedValueOnce(getUserDocumentDataMockById('oE6yUEQBPn7PZ89yMjKn'))
    jest.mocked(getOfferById).mockResolvedValueOnce(offer)
    const updatedOffer = assoc('state', OFFER_STATE_ACCEPTED, offer)
    jest.mocked(acceptOffer).mockResolvedValueOnce(updatedOffer)
    const req = mockRequest<AcceptOfferRequest>({ signature })
    const res = await acceptOfferRequestHandler(user, req, { id: offerId })
    expect(acceptOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as OfferResponse
    expect(responseData).toEqual({ offer: updatedOffer })
  })
})
