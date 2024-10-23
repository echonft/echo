import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import { Expiration } from '@echo/model/constants/expiration'
import { expirationToDateNumber } from '@echo/model/helpers/expiration-to-date-number'
import { getListingMock } from '@echo/model/mocks/listing/get-listing-mock'
import type { Listing } from '@echo/model/types/listing/listing'
import { deleteListing } from '@echo/test/firestore/crud/listing/delete-listing'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, modify, omit, pipe } from 'ramda'

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

  it('throws if the listing is a duplicate', async () => {
    const args = pipe(getListingMock, assoc('expiration', Expiration.OneDay))()
    await expect(addListing(args)).rejects.toEqual(Error(ListingError.Exists))
  })

  it('add a listing', async () => {
    const expiration = Expiration.OneDay
    const args = pipe(
      getListingMock,
      modify<'target', Listing['target'], Listing['target']>('target', assoc('quantity', 20)),
      assoc('expiration', expiration)
    )()
    const { id } = await addListing(args)
    const expirationDate = expirationToDateNumber(expiration)
    createdListingId = id
    const listing = await getListingById(createdListingId)
    expect(omit(['slug', 'expiresAt'], listing!)).toStrictEqual(omit(['slug', 'expiresAt', 'expiration'], args))
    expect(listing?.slug).toBeMsSlug()
    expect(listing?.expiresAt).toBeUnixTimestampCloseTo(expirationDate)
  })
})
