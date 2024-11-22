import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { nftMockPx1, nftMockPx2 } from '@echo/model/mocks/nft-mock'
import { serializeCollection } from '@echo/model/serializers/serialize-collection'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import { createListingSearchParamsDataSchema } from '@echo/routing/validators/frontend/listing/create-listing-search-params-data-schema'
import { describe, expect, test } from '@jest/globals'

describe('listingSearchParamsDataSchema', () => {
  test('transforms items correctly', () => {
    expect(
      createListingSearchParamsDataSchema.parse({ items: [serializeNft(nftMockPx1), serializeNft(nftMockPx2)] })
    ).toStrictEqual({
      items: [nftIndex(nftMockPx1), nftIndex(nftMockPx2)],
      target: undefined
    })
  })

  test('transforms target correctly', () => {
    expect(createListingSearchParamsDataSchema.parse({ target: collectionMockPx.slug })).toStrictEqual({
      items: [],
      target: serializeCollection(collectionMockPx)
    })
  })
})
