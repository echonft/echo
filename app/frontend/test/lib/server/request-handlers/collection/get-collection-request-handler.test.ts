import type { GetCollectionResponse } from '@echo/api/types/responses/get-collection-response'
import { getNftCollectionMockById } from '@echo/firestore-mocks/nft-collection/get-nft-collection-mock-by-id'
import { getCollectionBySlug } from '@server/helpers/collection/get-collection-by-slug'
import { getCollectionRequestHandler } from '@server/request-handlers/collection/get-collection-request-handler'
import { mockRequest } from '@server-mocks/request-response'

jest.mock('@server/helpers/collection/get-collection-by-slug')

describe('request-handlers - collection - getCollectionRequestHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the collection is not found', async () => {
    jest.mocked(getCollectionBySlug).mockResolvedValueOnce(undefined)
    const req = mockRequest<never>()
    await expect(getCollectionRequestHandler(req, 'slug')).rejects.toBeDefined()
  })

  it('returns the collection when it exists', async () => {
    const collection = getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
    jest.mocked(getCollectionBySlug).mockResolvedValueOnce(collection)
    const req = mockRequest<never>()
    const res = await getCollectionRequestHandler(req, 'slug')
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as GetCollectionResponse
    expect(responseData).toEqual({ collection })
  })
})
