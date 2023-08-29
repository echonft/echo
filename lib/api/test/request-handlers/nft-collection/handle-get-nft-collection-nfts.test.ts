import { getNftCollectionNfts } from '../../../src/helpers/nft/get-nft-collection-nfts'
import { getNftCollectionBySlug } from '../../../src/helpers/nft-collection/get-nft-collection-by-slug'
import { mapNft } from '../../../src/mappers/to-response/map-nft'
import { handleGetNftCollectionNfts } from '../../../src/request-handlers/nft-collection/handle-get-nft-collection-nfts'
import { mockRequestResponse } from '../../mocks/request-response'
import { GetNftCollectionNftsResponse } from '@echo/api-public'
import { getNftCollectionMockById, getNftMockById } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../../src/helpers/nft-collection/get-nft-collection-by-slug')
jest.mock('../../../src/helpers/nft/get-nft-collection-nfts')

describe('request-handlers - nft-collection - handleGetNftCollectionNfts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the collection is not found', async () => {
    jest.mocked(getNftCollectionBySlug).mockResolvedValueOnce(undefined)
    const { res } = mockRequestResponse<never, never, GetNftCollectionNftsResponse>('GET')
    await expect(handleGetNftCollectionNfts('slug', res)).rejects.toBeDefined()
  })

  it('returns the collection nfts when it exists', async () => {
    const collection = getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
    const nfts = [getNftMockById('8hHFadIrrooORfTOLkBg')]
    const nftsResponses = [mapNft(nfts[0]!, collection)]
    jest.mocked(getNftCollectionBySlug).mockResolvedValueOnce(collection)
    jest.mocked(getNftCollectionNfts).mockResolvedValueOnce(nfts)
    const { res } = mockRequestResponse<never, never, GetNftCollectionNftsResponse>('GET')
    await handleGetNftCollectionNfts('slug', res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ nfts: nftsResponses })
  })
})
