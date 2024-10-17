import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListing } from '@echo/firestore/crud/listing/get-listing'
import { updateListing } from '@echo/firestore/utils/listing/update-listing'
import { ListingState } from '@echo/model/constants/listing-state'
import { getListingMockBySlug } from '@echo/model/mocks/listing/get-listing-mock-by-slug'
import { listingMockSlug } from '@echo/model/mocks/listing/listing-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

describe('CRUD - listing - cancelListing', () => {
  let slug: Nullable<string>
  beforeEach(() => {
    slug = undefined
  })
  afterEach(async () => {
    if (!isNil(slug)) {
      await updateListing(slug, getListingMockBySlug(slug))
    }
  })

  it('throws if the listing is undefined', async () => {
    await expect(cancelListing('not-found')).rejects.toBeDefined()
  })
  it('throws if the listing is expired', async () => {
    slug = listingMockSlug()
    await updateListing(slug, {
      state: ListingState.Expired,
      expiresAt: dayjs().subtract(1, 'day').unix()
    })
    await expect(cancelListing(slug)).rejects.toBeDefined()
  })
  it('throws if the listing is cancelled', async () => {
    slug = listingMockSlug()
    await updateListing(slug, {
      state: ListingState.Cancelled,
      expiresAt: dayjs().add(1, 'day').unix()
    })
    await expect(cancelListing(slug)).rejects.toBeDefined()
  })
  it('throws if the listing is fulfilled', async () => {
    slug = listingMockSlug()
    await updateListing(slug, {
      state: ListingState.Fulfilled,
      expiresAt: dayjs().add(1, 'day').unix()
    })
    await expect(cancelListing(slug)).rejects.toBeDefined()
  })
  it('cancel listing if its not expired and in the right state', async () => {
    slug = listingMockSlug()
    await updateListing(slug, {
      state: ListingState.Open,
      expiresAt: dayjs().add(1, 'day').unix()
    })
    await cancelListing(slug)
    const updatedListing = await getListing(slug)
    expect(updatedListing?.state).toEqual(ListingState.Cancelled)
  })
})
