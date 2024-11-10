import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { nftMockPx1, nftMockPx2 } from '@echo/model/mocks/nft-mock'
import { serializeCollection } from '@echo/model/serializers/serialize-collection'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import { listingSearchParamsDataSchema } from '@echo/routing/validators/frontend/listing/listing-search-params-data-schema'
import { describe, expect, test } from '@jest/globals'

describe('listingSearchParamsDataSchema', () => {
  test('transform items correctly', () => {
    expect(
      listingSearchParamsDataSchema.parse({ items: [serializeNft(nftMockPx1), serializeNft(nftMockPx2)] })
    ).toStrictEqual({
      items: [nftIndex(nftMockPx1), nftIndex(nftMockPx2)],
      target: undefined
    })
  })

  test('transform target correctly', () => {
    expect(listingSearchParamsDataSchema.parse({ target: collectionMockPx.slug })).toStrictEqual({
      items: [],
      target: serializeCollection(collectionMockPx)
    })
  })
})
