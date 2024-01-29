import { type ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { getListingTargetsFromRequests } from '@echo/frontend/lib/helpers/listing/get-listing-targets-from-requests'
import { type Collection } from '@echo/model/types/collection'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { forEach } from 'ramda'

jest.mock('@echo/firestore/crud/collection/find-collection-by-slug')

describe('helpers - listing - getListingTargetsFromRequests', () => {
  const listingTargetRequest: ListingTargetRequest = {
    amount: 1,
    collection: {
      slug: 'collection-slug'
    }
  }
  const collection = {
    slug: 'collection-slug',
    name: 'collection-name'
  } as Collection
  const listingTarget = {
    amount: 1,
    collection
  } as ListingTarget
  const listingTargetRequests: ListingTargetRequest[] = [listingTargetRequest, listingTargetRequest]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the collection does not exist for one or more items', async () => {
    jest.mocked(findCollectionBySlug).mockResolvedValue(undefined)
    await expect(getListingTargetsFromRequests(listingTargetRequests)).rejects.toBeDefined()
  })

  it('returns the associated listing targets', async () => {
    jest.mocked(findCollectionBySlug).mockResolvedValue(collection)
    const targets = await getListingTargetsFromRequests(listingTargetRequests)
    expect(targets.length).toEqual(2)
    forEach((target) => {
      expect(target).toStrictEqual(listingTarget)
    }, targets)
  })
})
