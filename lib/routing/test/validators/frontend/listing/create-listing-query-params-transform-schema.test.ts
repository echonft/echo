import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { nftMockPx1, nftMockPx2 } from '@echo/model/mocks/nft-mock'
import { serializeCollection } from '@echo/model/serializers/serialize-collection'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import { createListingQueryParamsTransformSchema } from '@echo/routing/validators/frontend/listing/create-listing-query-params-transform-schema'
import { describe, expect, test } from '@jest/globals'

describe('createListingQueryParamsTransformSchema', () => {
  test('transforms items correctly', () => {
    expect(createListingQueryParamsTransformSchema.parse({ items: [nftMockPx1, nftMockPx2] })).toStrictEqual({
      items: [serializeNft(nftMockPx1), serializeNft(nftMockPx2)]
    })
  })

  test('transforms target correctly', () => {
    expect(createListingQueryParamsTransformSchema.parse({ target: collectionMockPx })).toStrictEqual({
      target: serializeCollection(collectionMockPx)
    })
  })
})
