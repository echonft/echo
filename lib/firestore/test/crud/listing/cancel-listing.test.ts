import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { assertListings } from '@echo/firestore/utils/listing/assert-listings'
import { updateListing } from '@echo/firestore/utils/listing/update-listing'
import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_EXPIRED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_OPEN
} from '@echo/model/constants/listing-states'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

describe('CRUD - listing - cancelListing', () => {
  let listingId: Nullable<string>

  beforeAll(async () => {
    await assertListings()
  })
  afterAll(async () => {
    await assertListings()
  })
  beforeEach(() => {
    listingId = undefined
  })
  afterEach(async () => {
    if (!isNil(listingId)) {
      await updateListing(listingId, getListingMockById(listingId))
    }
  })

  it('throws if the listing is undefined', async () => {
    await expect(cancelListing('not-found')).rejects.toBeDefined()
  })
  it('throws if the listing is expired', async () => {
    listingId = listingMockId()
    await updateListing(listingId, {
      state: LISTING_STATE_EXPIRED,
      expiresAt: dayjs().subtract(1, 'day').unix()
    })
    await expect(cancelListing(listingId)).rejects.toBeDefined()
  })
  it('throws if the listing is cancelled', async () => {
    listingId = listingMockId()
    await updateListing(listingId, {
      state: LISTING_STATE_CANCELLED,
      expiresAt: dayjs().add(1, 'day').unix()
    })
    await expect(cancelListing(listingId)).rejects.toBeDefined()
  })
  it('throws if the listing is fulfilled', async () => {
    listingId = listingMockId()
    await updateListing(listingId, {
      state: LISTING_STATE_FULFILLED,
      expiresAt: dayjs().add(1, 'day').unix()
    })
    await expect(cancelListing(listingId)).rejects.toBeDefined()
  })
  it('cancel listing if its not expired and in the right state', async () => {
    listingId = listingMockId()
    const { slug } = await updateListing(listingId, {
      state: LISTING_STATE_OPEN,
      expiresAt: dayjs().add(1, 'day').unix()
    })
    await cancelListing(slug)
    const updatedListing = (await getListingById(listingId))!
    expect(updatedListing.state).toEqual(LISTING_STATE_CANCELLED)
  })
})
