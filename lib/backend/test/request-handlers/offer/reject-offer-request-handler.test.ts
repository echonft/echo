import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { mockRequest } from '@echo/backend/mocks/mock-request'
import { rejectOfferRequestHandler } from '@echo/backend/request-handlers/offer/reject-offer-request-handler'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/db-model/user/get-user-document-data-mock-by-username'
import { offerMockToJohnnycageSlug } from '@echo/model/mocks/offer-mock'
import { userMockJohnnyUsername } from '@echo/model/mocks/user-mock'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/firestore/crud/offer/get-offer')
jest.mock('@echo/firestore/crud/offer/reject-offer')

describe('request-handlers - offer - rejectOfferRequestHandler', () => {
  const slug = offerMockToJohnnycageSlug()
  // const offer = getOfferMockBySlug(slug)
  const user = getUserDocumentDataMockByUsername(userMockJohnnyUsername())

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce(undefined)
    const req = mockRequest()
    await expect(rejectOfferRequestHandler({ user, req, params: { slug } })).rejects.toBeInstanceOf(NotFoundError)
  })

  // FIXME
  // it('throws if the offer is locked', async () => {
  //   jest.mocked(getOffer).mockResolvedValueOnce(assoc('locked', true, offer))
  //   const req = mockRequest()
  //   await expect(rejectOfferRequestHandler({ user, req, params: { slug } })).rejects.toBeInstanceOf(ForbiddenError)
  // })
  //
  // it('throws if the offer state is not OPEN', async () => {
  //   jest.mocked(getOffer).mockResolvedValueOnce(assoc('state', OfferState.Accepted, offer))
  //   const req = mockRequest()
  //   await expect(rejectOfferRequestHandler({ user, req, params: { slug } })).rejects.toBeInstanceOf(ForbiddenError)
  // })
  //
  // it('throws if the user is not the offer receiver', async () => {
  //   jest
  //     .mocked(getOffer)
  //     .mockResolvedValueOnce(modify<Offer, 'receiver', User>('receiver', assoc('username', 'another-user'), offer))
  //   const req = mockRequest()
  //   await expect(rejectOfferRequestHandler({ user, req, params: { slug } })).rejects.toBeInstanceOf(ForbiddenError)
  // })
  //
  // it('returns a 200', async () => {
  //   jest.mocked(getOffer).mockResolvedValueOnce(offer)
  //   const updatedOffer = assoc('state', OfferState.Rejected, offer)
  //   jest.mocked(rejectOffer).mockResolvedValueOnce(updatedOffer)
  //   const req = mockRequest()
  //   const res = await rejectOfferRequestHandler({ user, req, params: { slug } })
  //   expect(rejectOffer).toHaveBeenCalledTimes(1)
  //   expect(res.status).toBe(200)
  //   const responseData = (await res.json()) as OfferResponse
  //   expect(responseData).toEqual({ offer: updatedOffer })
  // })
})
