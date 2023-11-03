import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { guarded_getNftsForCollection } from '@echo/frontend/lib/server/helpers/nft/guarded_get-nfts-for-collection'
import { getCollectionNftsRequestHandler } from '@echo/frontend/lib/server/request-handlers/collection/get-collection-nfts-request-handler'
import { mockRequest } from '@echo/frontend-mocks/request-response'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'

jest.mock('@echo/frontend/lib/server/helpers/nft/guarded_get-nfts-for-collection')

describe('request-handlers - collection - getCollectionNftsRequestHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns the collection nfts when it exists', async () => {
    const nfts = [getNftMockById('8hHFadIrrooORfTOLkBg')]
    jest.mocked(guarded_getNftsForCollection).mockResolvedValueOnce(nfts)
    const req = mockRequest<never>()
    const res = await getCollectionNftsRequestHandler(req, 'slug')
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as NftsResponse
    expect(responseData).toEqual({ nfts })
  })
})
