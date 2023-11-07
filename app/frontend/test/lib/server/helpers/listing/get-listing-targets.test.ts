import { type ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import { getListingTargetsFromRequests } from '@echo/frontend/lib/server/helpers/listing/get-listing-targets-from-requests'
import { type Collection } from '@echo/model/types/collection'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { forEach } from 'ramda'

jest.mock('@echo/firestore/crud/collection/find-collection-by-id')

describe('helpers - listing - getListingTargets', () => {
  const listingTargetRequest: ListingTargetRequest = {
    amount: 1,
    collection: {
      id: 'collection-id'
    }
  }
  const collection = {
    id: 'collection-id',
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
    jest.mocked(findCollectionById).mockResolvedValue(undefined)
    await expect(getListingTargetsFromRequests(listingTargetRequests)).rejects.toBeDefined()
  })

  it('returns the associated listing targets', async () => {
    jest.mocked(findCollectionById).mockResolvedValue(collection)
    const targets = await getListingTargetsFromRequests(listingTargetRequests)
    expect(targets.length).toEqual(2)
    forEach((target) => {
      expect(target).toStrictEqual(listingTarget)
    }, targets)
  })
})
