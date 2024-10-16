import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { ForbiddenError } from '@echo/backend/errors/forbidden-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { mockRequest } from '@echo/backend/mocks/mock-request'
import { rejectOfferRequestHandler } from '@echo/backend/request-handlers/offer/reject-offer-request-handler'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { rejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-username'
import { OFFER_STATE_ACCEPTED, OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import { getOfferMockBySlug } from '@echo/model/mocks/offer/get-offer-mock-by-slug'
import { offerMockToJohnnycageSlug } from '@echo/model/mocks/offer/offer-mock'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { type Offer } from '@echo/model/types/offer/offer'
import type { User } from '@echo/model/types/user/user'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { assoc, modify } from 'ramda'

jest.mock('@echo/firestore/crud/offer/get-offer')
jest.mock('@echo/firestore/crud/offer/reject-offer')

describe('request-handlers - offer - rejectOfferRequestHandler', () => {
  const slug = offerMockToJohnnycageSlug()
  const offer = getOfferMockBySlug(slug)
  const user = getUserDocumentDataMockByUsername(userMockJohnnyUsername())

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce(undefined)
    const req = mockRequest()
    await expect(() => rejectOfferRequestHandler({ user, req, params: { slug } })).rejects.toBeInstanceOf(NotFoundError)
  })

  it('throws if the offer state is read only', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce(assoc('readOnly', true, offer))
    const req = mockRequest()
    await expect(() => rejectOfferRequestHandler({ user, req, params: { slug } })).rejects.toBeInstanceOf(
      ForbiddenError
    )
  })

  it('throws if the offer state is not OPEN', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce(assoc('state', OFFER_STATE_ACCEPTED, offer))
    const req = mockRequest()
    await expect(() => rejectOfferRequestHandler({ user, req, params: { slug } })).rejects.toBeInstanceOf(
      ForbiddenError
    )
  })

  it('throws if the user is not the offer receiver', async () => {
    jest
      .mocked(getOffer)
      .mockResolvedValueOnce(modify<Offer, 'receiver', User>('receiver', assoc('username', 'another-user'), offer))
    const req = mockRequest()
    await expect(() => rejectOfferRequestHandler({ user, req, params: { slug } })).rejects.toBeInstanceOf(
      ForbiddenError
    )
  })

  it('returns a 200', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce(offer)
    const updatedOffer = assoc('state', OFFER_STATE_REJECTED, offer)
    jest.mocked(rejectOffer).mockResolvedValueOnce(updatedOffer)
    const req = mockRequest()
    const res = await rejectOfferRequestHandler({ user, req, params: { slug } })
    expect(rejectOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as OfferResponse
    expect(responseData).toEqual({ offer: updatedOffer })
  })
})
