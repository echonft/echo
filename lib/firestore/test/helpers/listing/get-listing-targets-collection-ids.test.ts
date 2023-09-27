import { getListingTargetsCollectionIds } from '@echo/firestore/helpers/listing/get-listing-targets-collection-ids'
import { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import { getNftCollectionMockById } from '@echo/firestore-mocks/nft-collection/get-nft-collection-mock-by-id'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { describe, expect, it } from '@jest/globals'

describe('helpers - listing - getListingTargetsCollectionIds', () => {
  it('returns a list of collection ids of the targets', () => {
    const targets: NonEmptyArray<FirestoreListingTarget> = [
      { amount: 1, collection: getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13') },
      { amount: 1, collection: getNftCollectionMockById('1aomCtnoesD7WVll6Yi1') },
      { amount: 3, collection: getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13') }
    ]
    expect(getListingTargetsCollectionIds({ targets } as FirestoreListing)).toEqual([
      'Rc8pLQXxgyQGIRL0fr13',
      '1aomCtnoesD7WVll6Yi1'
    ])
  })
})
