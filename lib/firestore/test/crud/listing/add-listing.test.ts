import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { assertListings } from '@echo/firestore-test/listing/assert-listings'
import { deleteListing } from '@echo/firestore-test/listing/delete-listing'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { LISTING_STATE_OPEN } from '@echo/model/constants/listing-states'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { expectDateNumberIs } from '@echo/utils-test/expect-date-number-is'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { slice } from 'ramda'

describe('CRUD - listing - addListing', () => {
  let createdListingId: string

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    try {
      await deleteListing(createdListingId)
    } catch (e) {
      throw Error(`error deleting listing with id ${createdListingId}: ${errorMessage(e)}`)
    }
    await assertListings()
    await tearDownRemoteFirestoreTests()
  })

  it('throws if the listing is a duplicate', async () => {
    const { items, targets } = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    await expect(addListing(items, targets)).rejects.toBeDefined()
  })

  it('add a listing', async () => {
    const { creator, items, targets } = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    const newItems = slice(0, 1, items)
    const createdListing = await addListing(newItems, targets)
    createdListingId = createdListing.id
    const newListing = (await findListingById(createdListingId))!
    expect(newListing.creator).toStrictEqual(creator)
    expect(newListing.items).toStrictEqual(newItems)
    expect(newListing.state).toBe(LISTING_STATE_OPEN)
    expect(newListing.targets).toStrictEqual(targets)
    expectDateNumberIsNow(newListing.updatedAt)
    expectDateNumberIs(newListing.expiresAt)(dayjs().add(DEFAULT_EXPIRATION_TIME, 'day'))
  })
})
