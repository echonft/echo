import type { GetNftsResponse } from '@echo/api/types/responses/get-nfts-response'
import { getNftMockById } from '@echo/firestore-mocks/nft/get-nft-mock-by-id'
import { getNftCollectionMockById } from '@echo/firestore-mocks/nft-collection/get-nft-collection-mock-by-id'
import { getCollectionBySlug } from '@server/helpers/collection/get-collection-by-slug'
import { getCollectionNfts } from '@server/helpers/nft/get-collection-nfts'
import { mapNftToResponse } from '@server/mappers/to-response/map-nft-to-response'
import { getCollectionNftsRequestHandler } from '@server/request-handlers/collection/get-collection-nfts-request-handler'
import { mockRequest } from '@server-mocks/request-response'

jest.mock('@server/helpers/collection/get-collection-by-slug')
jest.mock('@server/helpers/nft/get-collection-nfts')

describe('request-handlers - collection - getCollectionNftsRequestHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the collection is not found', async () => {
    jest.mocked(getCollectionBySlug).mockResolvedValueOnce(undefined)
    const req = mockRequest<never>()
    await expect(getCollectionNftsRequestHandler(req, 'slug')).rejects.toBeDefined()
  })

  it('returns the collection nfts when it exists', async () => {
    const collection = getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
    const nfts = [getNftMockById('8hHFadIrrooORfTOLkBg')]
    const nftsResponses = [mapNftToResponse(nfts[0]!)]
    jest.mocked(getCollectionBySlug).mockResolvedValueOnce(collection)
    jest.mocked(getCollectionNfts).mockResolvedValueOnce(nfts)
    const req = mockRequest<never>()
    const res = await getCollectionNftsRequestHandler(req, 'slug')
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as GetNftsResponse
    expect(responseData).toEqual({ nfts: nftsResponses })
  })
})
