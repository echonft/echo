import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-username'
import { ForbiddenError } from '@echo/frontend/lib/helpers/error/forbidden-error'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import { getOfferByIdContractRequestHandler } from '@echo/frontend/lib/request-handlers/offer/get-offer-by-id-contract-request-handler'
import { mockRequest } from '@echo/frontend/mocks/mock-request'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { getOfferMockByIdContract } from '@echo/model/mocks/offer/get-offer-mock-by-id-contract'
import { offerMockFromJohnnycageId, offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { toPromise } from '@echo/utils/fp/to-promise'
import { pipe } from 'ramda'

jest.mock('@echo/firestore/crud/offer/get-offer-by-id-contract')

describe('request-handlers - offer - getOfferByIdContractRequestHandler', () => {
  const offerMock = getOfferMockById(offerMockFromJohnnycageId())
  const sender = getUserDocumentDataMockByUsername(userMockJohnnyUsername())
  const receiver = getUserDocumentDataMockByUsername(userMockCrewUsername())
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

  it('throws if the user is not the sender nor the receiver', async () => {
    jest.mocked(getOfferByIdContract).mockResolvedValueOnce({
      ...offerMock,
      sender: { ...offerMock.sender, username: 'other-user' },
      receiver: { ...offerMock.receiver, username: 'other-user' }
    })
    const req = mockRequest()
    await expect(() =>
      getOfferByIdContractRequestHandler({ user: sender, req, params: { idContract: '0xtest' } })
    ).rejects.toBeInstanceOf(ForbiddenError)
  })

  it('returns a 200 if the user is authenticated and user is sender', async () => {
    const offer = getOfferMockById(offerMockToJohnnycageId())
    const req = mockRequest()
    const res = await getOfferByIdContractRequestHandler({ user: sender, req, params: { idContract: '0xtest' } })
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as OfferResponse
    expect(responseData).toEqual({ offer })
  })

  it('returns a 200 if the user is authenticated and user is receiver', async () => {
    const offer = getOfferMockById(offerMockToJohnnycageId())
    const req = mockRequest()
    const res = await getOfferByIdContractRequestHandler({ user: receiver, req, params: { idContract: '0xtest' } })
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as OfferResponse
    expect(responseData).toEqual({ offer })
  })
})
