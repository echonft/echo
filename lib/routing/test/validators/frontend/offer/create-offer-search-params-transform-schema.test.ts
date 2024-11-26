import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { nftMockPx1, nftMockPx2 } from '@echo/model/mocks/nft-mock'
import { serializeCollection } from '@echo/model/serializers/serialize-collection'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import { createOfferSearchParamsTransformSchema } from '@echo/routing/validators/frontend/offer/create-offer-search-params-transform-schema'
import { describe, expect, test } from '@jest/globals'

describe('createOfferSearchParamsDataSchema', () => {
  test('transforms a single item correctly without target', () => {
    expect(createOfferSearchParamsTransformSchema.parse({ items: serializeNft(nftMockPx1) })).toStrictEqual({
      items: [nftIndex(nftMockPx1)]
    })
  })

  test('transforms items correctly without target', () => {
    expect(
      createOfferSearchParamsTransformSchema.parse({ items: [serializeNft(nftMockPx1), serializeNft(nftMockPx2)] })
    ).toStrictEqual({
      items: [nftIndex(nftMockPx1), nftIndex(nftMockPx2)]
    })
  })

  test('transforms a single item correctly with target', () => {
    expect(
      createOfferSearchParamsTransformSchema.parse({
        items: serializeNft(nftMockPx1),
        target: serializeCollection(collectionMockPx)
      })
    ).toStrictEqual({
      items: [nftIndex(nftMockPx1)],
      target: serializeCollection(collectionMockPx)
    })
  })

  test('transforms items correctly with target', () => {
    expect(
      createOfferSearchParamsTransformSchema.parse({
        items: [serializeNft(nftMockPx1), serializeNft(nftMockPx2)],
        target: serializeCollection(collectionMockPx)
      })
    ).toStrictEqual({
      items: [nftIndex(nftMockPx1), nftIndex(nftMockPx2)],
      target: serializeCollection(collectionMockPx)
    })
  })
})
