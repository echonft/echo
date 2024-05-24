import { type ListingTarget } from '@echo/model/types/listing-target'
import { COLLECTION_MOCK_PX_ID, COLLECTION_MOCK_PX_SLUG } from '@echo/model-mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { mapListingTargetToRequest } from '@echo/ui/mappers/to-api/map-listing-target-to-request'
import { describe, expect, it } from '@jest/globals'

describe('mappers - to-api - mapListingTargetToRequest', () => {
  it('throw if the target is undefined', () => {
    expect(() => mapListingTargetToRequest(undefined)).toThrow()
  })
  it('maps correctly', () => {
    const target: ListingTarget = {
      amount: 2,
      collection: getCollectionMockById(COLLECTION_MOCK_PX_ID)
    }
    expect(mapListingTargetToRequest(target)).toStrictEqual({
      amount: 2,
      collection: {
        slug: COLLECTION_MOCK_PX_SLUG
      }
    })
  })
})
