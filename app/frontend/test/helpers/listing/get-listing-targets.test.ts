import { getListingTargets } from '../../../src/lib/server/helpers/listing/get-listing-targets'
import { ListingTargetRequest } from '@echo/api'
import { findNftCollectionById, ListingTarget, NftCollection } from '@echo/firestore'
import { NonEmptyArray } from '@echo/utils'
import { forEach } from 'ramda'

jest.mock('@echo/firestore')

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
  } as NftCollection
  const listingTarget = {
    amount: 1,
    collection
  } as ListingTarget
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
