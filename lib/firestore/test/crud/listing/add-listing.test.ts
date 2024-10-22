import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { deleteListing } from '@echo/firestore/crud/listing/delete-listing'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { Expiration } from '@echo/model/constants/expiration'
import { ListingState } from '@echo/model/constants/listing-state'
import { expirationToDate } from '@echo/model/helpers/expiration-to-date'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { assoc, isNil } from 'ramda'

describe('CRUD - listing - addListing', () => {
  let createdListingId: Nullable<string>
  beforeEach(() => {
    createdListingId = undefined
  })
  afterEach(async () => {
    if (!isNil(createdListingId)) {
      await deleteListing(createdListingId)
    }
  })

  it('add a listing', async () => {
    const { creator, items, target } = getListingMockById(listingMockId())
    const expirationDate = expirationToDate(Expiration.OneDay)
    const newTarget = assoc('amount', 1, target)
    const newDocument = await addListing({ creator, items, target: newTarget, expiration: Expiration.OneDay })
    createdListingId = newDocument.id
    const newListing = (await getListingById(createdListingId))!
    expect(newListing.creator).toStrictEqual(creator)
    expect(newListing.items).toStrictEqual(items)
    expect(newListing.state).toBe(ListingState.Open)
    expect(newListing.target).toStrictEqual(newTarget)
    expect(dayjs.unix(newListing.expiresAt).isAfter(expirationDate.subtract(1, 'minute'))).toBeTruthy()
    expect(dayjs.unix(newListing.expiresAt).isBefore(expirationDate.add(1, 'minute'))).toBeTruthy()
  })
})
