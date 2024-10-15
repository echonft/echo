import { type ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { getListingTargetFromRequest } from '@echo/frontend/lib/helpers/listing/get-listing-target-from-request'
import { type Collection } from '@echo/model/types/collection'
import { type ListingTarget } from '@echo/model/types/listing-target'

jest.mock('@echo/firestore/crud/collection/get-collection')

describe('helpers - listing - getListingTargetsFromRequest', () => {
  const listingTargetRequest: ListingTargetRequest = {
    quantity: 1,
    collection: {
      slug: 'collection-slug'
    }
  }
  const collection = {
    slug: 'collection-slug',
    name: 'collection-name'
  } as Collection
  const listingTarget = {
    quantity: 1,
    collection
  } as ListingTarget

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the collection does not exist for one or more items', async () => {
    jest.mocked(getCollection).mockResolvedValue(undefined)
    await expect(getListingTargetFromRequest(listingTargetRequest)).rejects.toBeDefined()
  })

  it('returns the associated listing targets', async () => {
    jest.mocked(getCollection).mockResolvedValue(collection)
    const target = await getListingTargetFromRequest(listingTargetRequest)
    expect(target).toStrictEqual(listingTarget)
  })
})
