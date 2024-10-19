import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { mockRequest } from '@echo/backend/mocks/mock-request'
import { getOfferByIdContractRequestHandler } from '@echo/backend/request-handlers/offer/get-offer-by-id-contract-request-handler'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-username'
import { getOfferMockByIdContract } from '@echo/model/mocks/offer/get-offer-mock-by-id-contract'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { toPromise } from '@echo/utils/fp/to-promise'
import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals'
import { pipe } from 'ramda'

jest.mock('@echo/firestore/crud/offer/get-offer-by-id-contract')

describe('request-handlers - offer - getOfferByIdContractRequestHandler', () => {
  // const offerMock = getOfferMockById(offerMockFromJohnnycageId())
  const sender = getUserDocumentDataMockByUsername(userMockJohnnyUsername())
  // const receiver = getUserDocumentDataMockByUsername(userMockCrewUsername())
  beforeAll(() => {
    jest.mocked(getOfferByIdContract).mockImplementation(pipe(getOfferMockByIdContract, toPromise))
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the offer is undefined', async () => {
    jest.mocked(getOfferByIdContract).mockResolvedValueOnce(undefined)
    const req = mockRequest()
    await expect(() =>
      getOfferByIdContractRequestHandler({ user: sender, req, params: { idContract: '0x' } })
    ).rejects.toBeInstanceOf(NotFoundError)
  })

  // FIXME
  // it('throws if the user is not the sender nor the receiver', async () => {
  //   jest.mocked(getOfferByIdContract).mockResolvedValueOnce({
  //     ...offerMock,
  //     sender: { ...offerMock.sender, username: 'other-user' },
  //     receiver: { ...offerMock.receiver, username: 'other-user' }
  //   })
  //   const req = mockRequest()
  //   await expect(() =>
  //     getOfferByIdContractRequestHandler({ user: sender, req, params: { idContract: '0xtest' } })
  //   ).rejects.toBeInstanceOf(ForbiddenError)
  // })
  //
  // it('returns a 200 if the user is authenticated and user is sender', async () => {
  //   const offer = getOfferMockById(offerMockToJohnnycageId())
  //   const req = mockRequest()
  //   const res = await getOfferByIdContractRequestHandler({ user: sender, req, params: { idContract: '0xtest' } })
  //   expect(res.status).toBe(200)
  //   const responseData = (await res.json()) as OfferResponse
  //   expect(responseData).toEqual({ offer })
  // })
  //
  // it('returns a 200 if the user is authenticated and user is receiver', async () => {
  //   const offer = getOfferMockById(offerMockToJohnnycageId())
  //   const req = mockRequest()
  //   const res = await getOfferByIdContractRequestHandler({ user: receiver, req, params: { idContract: '0xtest' } })
  //   expect(res.status).toBe(200)
  //   const responseData = (await res.json()) as OfferResponse
  //   expect(responseData).toEqual({ offer })
  // })
})
