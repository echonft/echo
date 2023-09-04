import { getNftCollectionNfts } from '../../../src/lib/server/helpers/nft/get-nft-collection-nfts'
import { getNftCollectionBySlug } from '../../../src/lib/server/helpers/nft-collection/get-nft-collection-by-slug'
import { mapNft } from '../../../src/lib/server/mappers/to-response/map-nft'
import { getNftCollectionNftsRequestHandler } from '../../../src/lib/server/request-handlers/nft-collection/get-nft-collection-nfts-request-handler'
import { mockRequest } from '../../mocks/request-response'
import { GetNftCollectionNftsResponse } from '@echo/api'
import { getNftCollectionMockById, getNftMockById } from '@echo/firestore'

jest.mock('../../../src/lib/server/helpers/nft-collection/get-nft-collection-by-slug')
jest.mock('../../../src/lib/server/helpers/nft/get-nft-collection-nfts')

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
    const nftsResponses = [mapNft(nfts[0]!, collection)]
    jest.mocked(getNftCollectionBySlug).mockResolvedValueOnce(collection)
    jest.mocked(getNftCollectionNfts).mockResolvedValueOnce(nfts)
    const req = mockRequest<never>()
    const res = await getNftCollectionNftsRequestHandler(req, 'slug')
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as GetNftCollectionNftsResponse
    expect(responseData).toEqual({ nfts: nftsResponses })
  })
})
