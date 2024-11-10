import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { nftMockPx1, nftMockPx2 } from '@echo/model/mocks/nft-mock'
import { serializeCollection } from '@echo/model/serializers/serialize-collection'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import { offerSearchParamsDataSchema } from '@echo/routing/validators/frontend/offer/offer-search-params-data-schema'
import { describe, expect, test } from '@jest/globals'

describe('offerSearchParamsDataSchema', () => {
  test('transforms correctly without target', () => {
    expect(
      offerSearchParamsDataSchema.parse({ items: [serializeNft(nftMockPx1), serializeNft(nftMockPx2)] })
    ).toStrictEqual({
      items: [nftIndex(nftMockPx1), nftIndex(nftMockPx2)]
    })
  })

  test('transforms correctly with target', () => {
    expect(
      offerSearchParamsDataSchema.parse({
        items: [serializeNft(nftMockPx1), serializeNft(nftMockPx2)],
        target: serializeCollection(collectionMockPx)
      })
    ).toStrictEqual({
      items: [nftIndex(nftMockPx1), nftIndex(nftMockPx2)],
      target: serializeCollection(collectionMockPx)
    })
  })
})
