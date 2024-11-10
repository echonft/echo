import { listingMock } from '@echo/model/mocks/listing-mock'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { swapMock } from '@echo/model/mocks/swap-mock'
import { serializeListing } from '@echo/model/serializers/serialize-listing'
import { serializeOffer } from '@echo/model/serializers/serialize-offer'
import { serializeSwap } from '@echo/model/serializers/serialize-swap'
import { selectionQueryParamsTransformSchema } from '@echo/routing/validators/frontend/selection/selection-query-params-transform-schema'
import { describe, expect, test } from '@jest/globals'

describe('selectionQueryParamsTransformSchema', () => {
  test('transform listing correctly', () => {
    expect(selectionQueryParamsTransformSchema.parse({ listing: listingMock })).toStrictEqual({
      listing: serializeListing(listingMock)
    })
  })

  test('transform offer correctly', () => {
    expect(selectionQueryParamsTransformSchema.parse({ offer: offerMockToJohnnycage })).toStrictEqual({
      offer: serializeOffer(offerMockToJohnnycage)
    })
  })

  test('transform swap correctly', () => {
    expect(selectionQueryParamsTransformSchema.parse({ swap: swapMock })).toStrictEqual({
      swap: serializeSwap(swapMock)
    })
  })
})
