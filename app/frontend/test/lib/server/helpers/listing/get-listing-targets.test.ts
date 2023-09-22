import type { ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import { findNftCollectionById } from '@echo/firestore/crud/nft-collection/find-nft-collection-by-id'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { getListingTargets } from '@server/helpers/listing/get-listing-targets'
import { forEach } from 'ramda'

jest.mock('@echo/firestore/crud/nft-collection/find-nft-collection-by-id')

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
  } as FirestoreNftCollection
  const listingTarget = {
    amount: 1,
    collection
  } as FirestoreListingTarget
  const listingTargetRequests: NonEmptyArray<ListingTargetRequest> = [listingTargetRequest, listingTargetRequest]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the collection does not exist for one or more items', async () => {
    jest.mocked(findNftCollectionById).mockResolvedValue(undefined)
    await expect(getListingTargets(listingTargetRequests)).rejects.toBeDefined()
  })

  it('returns the associated listing targets', async () => {
    jest.mocked(findNftCollectionById).mockResolvedValue(collection)
    const targets = await getListingTargets(listingTargetRequests)
    expect(targets.length).toEqual(2)
    forEach((target) => {
      expect(target).toStrictEqual(listingTarget)
    }, targets)
  })
})
