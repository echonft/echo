import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { nftMockPx1, nftMockPx2 } from '@echo/model/mocks/nft-mock'
import { serializeCollection } from '@echo/model/serializers/serialize-collection'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import { createListingSearchParamsTransformSchema } from '@echo/routing/validators/frontend/listing/create-listing-search-params-transform-schema'
import { describe, expect, test } from '@jest/globals'

describe('createListingSearchParamsDataSchema', () => {
  test('transforms a single item correctly', () => {
    expect(createListingSearchParamsTransformSchema.parse({ items: serializeNft(nftMockPx1) })).toStrictEqual({
      items: [nftIndex(nftMockPx1)],
      target: undefined
    })
  })

  test('transforms items correctly', () => {
    expect(
      createListingSearchParamsTransformSchema.parse({ items: [serializeNft(nftMockPx1), serializeNft(nftMockPx2)] })
    ).toStrictEqual({
      items: [nftIndex(nftMockPx1), nftIndex(nftMockPx2)],
      target: undefined
    })
  })

  test('transforms target correctly', () => {
    expect(createListingSearchParamsTransformSchema.parse({ target: collectionMockPx.slug })).toStrictEqual({
      items: [],
      target: serializeCollection(collectionMockPx)
    })
  })
})
