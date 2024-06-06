import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { getUserDocumentDataMockByUsername } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-username'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { cancelOfferRequestHandler } from '@echo/frontend/lib/request-handlers/offer/cancel-offer-request-handler'
import { getOfferMockBySlug } from '@echo/model-mocks/offer/get-offer-mock-by-slug'
import { offerMockToJohnnycageSlug } from '@echo/model-mocks/offer/offer-mock'
import { userMockCrewUsername } from '@echo/model-mocks/user/user-mock'
import { OFFER_STATE_CANCELLED } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { assoc, modify } from 'ramda'

jest.mock('@echo/firestore/crud/offer/get-offer')
jest.mock('@echo/firestore/crud/offer/cancel-offer')

describe('request-handlers - offer - cancelOfferRequestHandler', () => {
  const slug = offerMockToJohnnycageSlug()
  const offer = getOfferMockBySlug(slug)
  const user = getUserDocumentDataMockByUsername(userMockCrewUsername())

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce(undefined)
    const req = mockRequest<never>()
    await expect(() => cancelOfferRequestHandler(user, req, { slug })).rejects.toHaveProperty('status', 400)
  })

  it('throws if the offer state is read only', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce(assoc('readOnly', true, offer))
    const req = mockRequest<never>()
    await expect(() => cancelOfferRequestHandler(user, req, { slug })).rejects.toHaveProperty('status', 400)
  })

  it('throws if the user is not the offer sender', async () => {
    jest
      .mocked(getOffer)
      .mockResolvedValueOnce(modify<Offer, 'sender', User>('sender', assoc('username', 'another-user'), offer))
    const req = mockRequest<never>()
    await expect(() => cancelOfferRequestHandler(user, req, { slug })).rejects.toHaveProperty('status', 403)
  })

  it('returns a 200', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce(offer)
    const updatedOffer = assoc('state', OFFER_STATE_CANCELLED, offer)
    jest.mocked(cancelOffer).mockResolvedValueOnce(updatedOffer)
    const req = mockRequest<never>()
    const res = await cancelOfferRequestHandler(user, req, { slug })
    expect(cancelOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as OfferResponse
    expect(responseData).toEqual({ offer: updatedOffer })
  })
})
