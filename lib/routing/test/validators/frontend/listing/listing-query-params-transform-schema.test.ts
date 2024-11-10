import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { nftMockPx1, nftMockPx2 } from '@echo/model/mocks/nft-mock'
import { serializeCollection } from '@echo/model/serializers/serialize-collection'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import { listingQueryParamsTransformSchema } from '@echo/routing/validators/frontend/listing/listing-query-params-transform-schema'
import { describe, expect, test } from '@jest/globals'

describe('listingQueryParamsTransformSchema', () => {
  test('transforms items correctly', () => {
    expect(listingQueryParamsTransformSchema.parse({ items: [nftMockPx1, nftMockPx2] })).toStrictEqual({
      items: [serializeNft(nftMockPx1), serializeNft(nftMockPx2)]
    })
  })

  test('transforms target correctly', () => {
    expect(listingQueryParamsTransformSchema.parse({ target: collectionMockPx })).toStrictEqual({
      target: serializeCollection(collectionMockPx)
    })
  })
})
