import { getNftCollectionBySlug } from '../../../src/helpers/nft-collection/get-nft-collection-by-slug'
import { mapNftCollection } from '../../../src/mappers/to-response/map-nft-collection'
import { handleGetNftCollection } from '../../../src/request-handlers/nft-collection/handle-get-nft-collection'
import { mockRequestResponse } from '../../mocks/request-response'
import { GetNftCollectionResponse } from '@echo/api-public'
import { getNftCollectionMockById } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../../src/helpers/nft-collection/get-nft-collection-by-slug')
describe('request-handlers - nft-collection - handleGetNftCollection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the collection is not found', async () => {
    jest.mocked(getNftCollectionBySlug).mockResolvedValueOnce(undefined)
    const { res } = mockRequestResponse<never, never, GetNftCollectionResponse>('GET')
    await expect(handleGetNftCollection('slug', res)).rejects.toBeDefined()
  })

  it('returns the collection when it exists', async () => {
    const collection = getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
    const collectionResponse = mapNftCollection(collection)
    jest.mocked(getNftCollectionBySlug).mockResolvedValueOnce(collection)
    const { res } = mockRequestResponse<never, never, GetNftCollectionResponse>('GET')
    await handleGetNftCollection('slug', res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ collection: collectionResponse })
  })
})
