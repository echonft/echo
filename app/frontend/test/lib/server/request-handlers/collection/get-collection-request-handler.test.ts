import { type CollectionResponse } from '@echo/api/types/responses/collection-response'
import { getCollectionBySlug } from '@echo/frontend/lib/server/helpers/collection/get-collection-by-slug'
import { getCollectionRequestHandler } from '@echo/frontend/lib/server/request-handlers/collection/get-collection-request-handler'
import { mockRequest } from '@echo/frontend-mocks/request-response'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'

jest.mock('@echo/frontend/lib/server/helpers/collection/get-collection-by-slug')

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
    const collection = getCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
    jest.mocked(getCollectionBySlug).mockResolvedValueOnce(collection)
    const req = mockRequest<never>()
    const res = await getCollectionRequestHandler(req, 'slug')
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as CollectionResponse
    expect(responseData).toEqual({ collection })
  })
})
