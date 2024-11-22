import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { nftMockPx1, nftMockPx2 } from '@echo/model/mocks/nft-mock'
import { serializeCollection } from '@echo/model/serializers/serialize-collection'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import { createOfferQueryParamsTransformSchema } from '@echo/routing/validators/frontend/offer/create-offer-query-params-transform-schema'
import { describe, expect, test } from '@jest/globals'

describe('offerQueryParamsTransformSchema', () => {
  test('transforms correctly without target', () => {
    expect(createOfferQueryParamsTransformSchema.parse({ items: [nftMockPx1, nftMockPx2] })).toStrictEqual({
      items: [serializeNft(nftMockPx1), serializeNft(nftMockPx2)]
    })
  })

  test('transforms correctly with target', () => {
    expect(
      createOfferQueryParamsTransformSchema.parse({ items: [nftMockPx1, nftMockPx2], target: collectionMockPx })
    ).toStrictEqual({
      items: [serializeNft(nftMockPx1), serializeNft(nftMockPx2)],
      target: serializeCollection(collectionMockPx)
    })
  })
})
