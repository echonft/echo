import type { NftsResponse } from '@echo/api/types/responses/nfts-response'
import { getNftMockById } from '@echo/firestore-mocks/nft/get-nft-mock-by-id'
import { getCollectionNfts } from '@server/helpers/nft/get-collection-nfts'
import { getCollectionNftsRequestHandler } from '@server/request-handlers/collection/get-collection-nfts-request-handler'
import { mockRequest } from '@server-mocks/request-response'

jest.mock('@server/helpers/nft/get-collection-nfts')

describe('request-handlers - collection - getCollectionNftsRequestHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns the collection nfts when it exists', async () => {
    const nfts = [getNftMockById('8hHFadIrrooORfTOLkBg')]
    jest.mocked(getCollectionNfts).mockResolvedValueOnce(nfts)
    const req = mockRequest<never>()
    const res = await getCollectionNftsRequestHandler(req, 'slug')
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as NftsResponse
    expect(responseData).toEqual({ nfts })
  })
})
