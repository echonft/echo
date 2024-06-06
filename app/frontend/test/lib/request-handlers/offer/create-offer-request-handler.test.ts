import { type CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { getUserDocumentDataMockByUsername } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-username'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { getEscrowedNftsFromIndexes } from '@echo/frontend/lib/helpers/nft/get-escrowed-nfts-from-indexes'
import { getNftsFromIndexes } from '@echo/frontend/lib/helpers/nft/get-nfts-from-indexes'
import { createOfferRequestHandler } from '@echo/frontend/lib/request-handlers/offer/create-offer-request-handler'
import { getNftMockByIndex } from '@echo/model-mocks/nft/get-nft-mock-by-index'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { offerMockFromJohnnycageId, offerMockToJohnnycageId } from '@echo/model-mocks/offer/offer-mock'
import { userMockJohnnyUsername } from '@echo/model-mocks/user/user-mock'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { getNftIndexForNfts } from '@echo/model/helpers/nft/get-nft-index-for-nfts'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import { toPromise } from '@echo/utils/fp/to-promise'
import { futureDate } from '@echo/utils/helpers/future-date'
import { generateOfferId } from '@echo/web3/helpers/generate-offer-id'
import { append, assoc, head, map, modify, pipe, prop } from 'ramda'

jest.mock('@echo/frontend/lib/helpers/nft/get-nfts-from-indexes')
jest.mock('@echo/frontend/lib/helpers/nft/get-escrowed-nfts-from-indexes')
jest.mock('@echo/firestore/crud/offer/add-offer')
jest.mock('@echo/web3/helpers/generate-offer-id')

describe('request-handlers - offer - createOfferRequestHandler', () => {
  const offerMock = getOfferMockById(offerMockFromJohnnycageId())
  const validRequest: CreateOfferRequest = {
    receiverItems: pipe(prop('receiverItems'), getNftIndexForNfts)(offerMock),
    senderItems: pipe(prop('senderItems'), getNftIndexForNfts)(offerMock),
    expiresAt: futureDate()
  }
  const user = getUserDocumentDataMockByUsername(userMockJohnnyUsername())

  beforeAll(() => {
    jest.mocked(getNftsFromIndexes).mockImplementation(pipe(map<NftIndex, Nft>(getNftMockByIndex), toPromise))
    jest.mocked(getEscrowedNftsFromIndexes).mockImplementation(pipe(map<NftIndex, Nft>(getNftMockByIndex), toPromise))
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<CreateOfferRequest>({} as CreateOfferRequest)
    await expect(() => createOfferRequestHandler(user, req)).rejects.toHaveProperty('status', 400)
  })

  it('throws if the receiver is not the owner of every items', async () => {
    const notOwnedNft = head(offerMock.senderItems)!
    const request: CreateOfferRequest = modify('receiverItems', append(getNftIndex(notOwnedNft)), validRequest)
    jest.mocked(addOffer).mockResolvedValueOnce({
      id: offerMockToJohnnycageId(),
      data: getOfferMockById(offerMockToJohnnycageId()),
      listingOffers: []
    })
    const req = mockRequest<CreateOfferRequest>(request)
    await expect(() => createOfferRequestHandler(user, req)).rejects.toHaveProperty('status', 403)
  })

  it('throws if the sender is not the owner of every item', async () => {
    const request: CreateOfferRequest = assoc(
      'senderItems',
      pipe(prop('receiverItems'), getNftIndexForNfts)(offerMock),
      validRequest
    )
    jest.mocked(addOffer).mockResolvedValue({
      id: offerMockToJohnnycageId(),
      data: getOfferMockById(offerMockToJohnnycageId()),
      listingOffers: []
    })
    const req = mockRequest<CreateOfferRequest>(request)
    await expect(() => createOfferRequestHandler(user, req)).rejects.toHaveProperty('status', 403)
  })

  it('returns a 200 if the user is authenticated and both sender and receiver have a wallet', async () => {
    const offer = getOfferMockById(offerMockToJohnnycageId())
    jest.mocked(addOffer).mockResolvedValue({ id: offerMockToJohnnycageId(), data: offer, listingOffers: [] })
    jest.mocked(generateOfferId).mockReturnValue('0xID')
    const req = mockRequest<CreateOfferRequest>(validRequest)
    const res = await createOfferRequestHandler(user, req)
    expect(generateOfferId).toHaveBeenCalledTimes(1)
    expect(addOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as OfferResponse
    expect(responseData).toEqual({ offer })
  })
})
