import { listingMock } from '@echo/model/mocks/listing-mock'
import { offerMockFromJohnnycage, offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { swapMock } from '@echo/model/mocks/swap-mock'
import { FrontendSelectionType } from '@echo/routing/constants/frontend-selection-type'
import type { SelectionSearchParams } from '@echo/routing/types/frontend/search-params/selection-search-params'
import { selectionSearchParamsDataSchema } from '@echo/routing/validators/frontend/selection/selection-search-params-data-schema'
import { describe, expect, test } from '@jest/globals'
import { assoc } from 'ramda'

describe('selectionSearchParamsDataSchema', () => {
  test('returns undefined if searchParams are undefined', () => {
    expect(
      selectionSearchParamsDataSchema.parse({
        listings: [listingMock],
        offers: [offerMockToJohnnycage, offerMockFromJohnnycage],
        swaps: [swapMock],
        searchParams: undefined
      })
    ).toBeUndefined()
  })

  test('transforms listing selection correctly', () => {
    const searchParams: SelectionSearchParams = {
      listing: listingMock.slug
    }
    const listingMock2 = assoc('slug', 'another-slug', listingMock)
    const listingMock3 = assoc('slug', 'another-slug2', listingMock)
    expect(
      selectionSearchParamsDataSchema.parse({
        listings: [listingMock2, listingMock, listingMock3],
        offers: [],
        swaps: [],
        searchParams
      })
    ).toStrictEqual({
      index: 1,
      type: FrontendSelectionType.Listing
    })
    expect(
      selectionSearchParamsDataSchema.parse({
        listings: [],
        offers: [],
        swaps: [],
        searchParams
      })
    ).toBeUndefined()
    expect(
      selectionSearchParamsDataSchema.parse({
        listings: [listingMock2, listingMock3, listingMock2, listingMock3, listingMock3],
        offers: [],
        swaps: [],
        searchParams
      })
    ).toBeUndefined()
  })

  test('transforms offer selection correctly', () => {
    const searchParams: SelectionSearchParams = {
      offer: offerMockToJohnnycage.slug
    }
    const offerMock2 = assoc('slug', 'another-slug', offerMockToJohnnycage)
    const offerMock3 = assoc('slug', 'another-slug2', offerMockToJohnnycage)
    expect(
      selectionSearchParamsDataSchema.parse({
        listings: [],
        offers: [offerMockToJohnnycage, offerMock2, offerMock3],
        swaps: [],
        searchParams
      })
    ).toStrictEqual({
      index: 0,
      type: FrontendSelectionType.Offer
    })
    expect(
      selectionSearchParamsDataSchema.parse({
        listings: [],
        offers: [],
        swaps: [],
        searchParams
      })
    ).toBeUndefined()
    expect(
      selectionSearchParamsDataSchema.parse({
        listings: [],
        offers: [offerMock2, offerMock3, offerMock2, offerMock3, offerMock3],
        swaps: [],
        searchParams
      })
    ).toBeUndefined()
  })

  test('transforms swap selection correctly', () => {
    const searchParams: SelectionSearchParams = {
      swap: swapMock.slug
    }
    const swapMock2 = assoc('slug', 'another-slug', swapMock)
    const swapMock3 = assoc('slug', 'another-slug2', swapMock)
    expect(
      selectionSearchParamsDataSchema.parse({
        listings: [],
        offers: [],
        swaps: [swapMock2, swapMock3, swapMock],
        searchParams
      })
    ).toStrictEqual({
      index: 2,
      type: FrontendSelectionType.Swap
    })
    expect(
      selectionSearchParamsDataSchema.parse({
        listings: [],
        offers: [],
        swaps: [],
        searchParams
      })
    ).toBeUndefined()
    expect(
      selectionSearchParamsDataSchema.parse({
        listings: [],
        offers: [],
        swaps: [swapMock2, swapMock3, swapMock2, swapMock3],
        searchParams
      })
    ).toBeUndefined()
  })
})
