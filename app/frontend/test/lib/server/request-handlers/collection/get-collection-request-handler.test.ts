import { type CollectionResponse } from '@echo/api/types/responses/collection-response'
import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { getCollectionRequestHandler } from '@echo/frontend/lib/server/request-handlers/collection/get-collection-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'

jest.mock('@echo/firestore/crud/collection/find-collection-by-slug')

describe('request-handlers - collection - getCollectionRequestHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the collection is not found', async () => {
    jest.mocked(findCollectionBySlug).mockResolvedValueOnce(undefined)

    await expect(getCollectionRequestHandler(mockRequest<never>(), { slug: 'slug' })).rejects.toBeDefined()
  })

  it('returns the collection when it exists', async () => {
    const collection = getCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
    jest.mocked(findCollectionBySlug).mockResolvedValueOnce(collection)
    const res = await getCollectionRequestHandler(mockRequest<never>(), { slug: 'slug' })
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as CollectionResponse
    expect(responseData).toEqual({ collection })
  })
})
