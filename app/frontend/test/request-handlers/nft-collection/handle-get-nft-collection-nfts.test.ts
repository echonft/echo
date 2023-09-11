import { mockRequest } from '../../mocks/request-response'
import type { GetNftsResponse } from '@echo/api/types'
import { getNftCollectionMockById, getNftMockById } from '@echo/firestore'
import { getNftCollectionNfts } from '@server/helpers/nft/get-nft-collection-nfts'
import { getNftCollectionBySlug } from '@server/helpers/nft-collection/get-nft-collection-by-slug'
import { mapNft } from '@server/mappers/to-response/map-nft'
import { getNftCollectionNftsRequestHandler } from '@server/request-handlers/nft-collection/get-nft-collection-nfts-request-handler'

jest.mock('@server/helpers/nft-collection/get-nft-collection-by-slug')
jest.mock('@server/helpers/nft/get-nft-collection-nfts')

describe('request-handlers - nft-collection - handleGetNftCollectionNfts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the collection is not found', async () => {
    jest.mocked(getNftCollectionBySlug).mockResolvedValueOnce(undefined)
    const req = mockRequest<never>()
    await expect(getNftCollectionNftsRequestHandler(req, 'slug')).rejects.toBeDefined()
  })

  it('returns the collection nfts when it exists', async () => {
    const collection = getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
    const nfts = [getNftMockById('8hHFadIrrooORfTOLkBg')]
    const nftsResponses = [mapNft(nfts[0]!)]
    jest.mocked(getNftCollectionBySlug).mockResolvedValueOnce(collection)
    jest.mocked(getNftCollectionNfts).mockResolvedValueOnce(nfts)
    const req = mockRequest<never>()
    const res = await getNftCollectionNftsRequestHandler(req, 'slug')
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as GetNftsResponse
    expect(responseData).toEqual({ nfts: nftsResponses })
  })
})
