import { getNftCollectionBySlug } from '../../../src/lib/server/helpers/nft-collection/get-nft-collection-by-slug'
import { mapNftCollection } from '../../../src/lib/server/mappers/to-response/map-nft-collection'
import { getNftCollectionRequestHandler } from '../../../src/lib/server/request-handlers/nft-collection/get-nft-collection-request-handler'
import { mockRequest } from '../../mocks/request-response'
import { GetNftCollectionResponse } from '@echo/api'
import { getNftCollectionMockById } from '@echo/firestore'

jest.mock('../../../src/lib/server/helpers/nft-collection/get-nft-collection-by-slug')
describe('request-handlers - nft-collection - handleGetNftCollection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the collection is not found', async () => {
    jest.mocked(getNftCollectionBySlug).mockResolvedValueOnce(undefined)
    const req = mockRequest<never>()
    await expect(getNftCollectionRequestHandler(req, 'slug')).rejects.toBeDefined()
  })

  it('returns the collection when it exists', async () => {
    const collection = getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
    const collectionResponse = mapNftCollection(collection)
    jest.mocked(getNftCollectionBySlug).mockResolvedValueOnce(collection)
    const req = mockRequest<never>()
    const res = await getNftCollectionRequestHandler(req, 'slug')
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as GetNftCollectionResponse
    expect(responseData).toEqual({ collection: collectionResponse })
  })
})
