import { getListingTargetsCollectionIds } from '../../../src/helpers/listing/get-listing-targets-collection-ids'
import { ListingTarget } from '../../../src/types/model/listing-target'
import { getNftCollectionMockById } from '../../mocks/get-nft-collection-mock-by-id'
import { NonEmptyArray } from '@echo/utils'
import { describe, expect, it } from '@jest/globals'

describe('helpers - listing - getListingTargetsCollectionIds', () => {
  it('returns a list of collection ids of the targets', () => {
    const targets: NonEmptyArray<ListingTarget> = [
      { amount: 1, collection: getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13') },
      { amount: 1, collection: getNftCollectionMockById('1aomCtnoesD7WVll6Yi1') },
      { amount: 3, collection: getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13') }
    ]
    expect(getListingTargetsCollectionIds(targets)).toEqual(['Rc8pLQXxgyQGIRL0fr13', '1aomCtnoesD7WVll6Yi1'])
  })
})
