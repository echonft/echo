import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { acceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUserDocumentDataMockById } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-id'
import { getUserDocumentDataMockByUsername } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-username'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import { acceptOfferRequestHandler } from '@echo/frontend/lib/request-handlers/offer/accept-offer-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { OFFER_STATE_ACCEPTED } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { getOfferMockBySlug } from '@echo/model-mocks/offer/get-offer-mock-by-slug'
import { OFFER_MOCK_TO_JOHNNYCAGE_SLUG } from '@echo/model-mocks/offer/offer-mock'
import { USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { assoc, modify } from 'ramda'

jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/offer/get-offer')
jest.mock('@echo/firestore/crud/offer/accept-offer')

describe('request-handlers - offer - acceptOfferRequestHandler', () => {
  const slug = OFFER_MOCK_TO_JOHNNYCAGE_SLUG
  const offer = getOfferMockBySlug(slug)
  const user = getUserDocumentDataMockByUsername(USER_MOCK_JOHNNY_USERNAME)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if no signature is sent', async () => {
    const req = mockRequest<never>()
    try {
      await acceptOfferRequestHandler(user, req, { slug })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the offer does not exist', async () => {
    const req = mockRequest<never>()
    jest.mocked(getOffer).mockResolvedValueOnce(undefined)
    try {
      await acceptOfferRequestHandler(user, req, { slug })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the offer is read only', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce(assoc('readOnly', true, offer))
    const req = mockRequest<never>()
    try {
      await acceptOfferRequestHandler(user, req, { slug })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the offer state is not OPEN', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce(assoc('state', OFFER_STATE_ACCEPTED, offer))
    const req = mockRequest<never>()
    try {
      await acceptOfferRequestHandler(user, req, { slug })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the offer receiver', async () => {
    jest
      .mocked(getOffer)
      .mockResolvedValueOnce(modify<Offer, 'receiver', User>('receiver', assoc('username', 'another-user'), offer))
    const req = mockRequest<never>()
    try {
      await acceptOfferRequestHandler(user, req, { slug })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200', async () => {
    jest.mocked(getUserByUsername).mockResolvedValueOnce(getUserDocumentDataMockById('oE6yUEQBPn7PZ89yMjKn'))
    jest.mocked(getOffer).mockResolvedValueOnce(offer)
    const updatedOffer = assoc('state', OFFER_STATE_ACCEPTED, offer)
    jest.mocked(acceptOffer).mockResolvedValueOnce(updatedOffer)
    const req = mockRequest<never>()
    const res = await acceptOfferRequestHandler(user, req, { slug })
    expect(acceptOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as OfferResponse
    expect(responseData).toEqual({ offer: updatedOffer })
  })
})
