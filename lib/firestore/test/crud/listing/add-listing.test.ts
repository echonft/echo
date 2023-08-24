import { DEFAULT_EXPIRATION_TIME } from '../../../src/constants/default-expiration-time'
import { addListing } from '../../../src/crud/listing/add-listing'
import { deleteListing } from '../../../src/crud/listing/delete-listing'
import { findListingById } from '../../../src/crud/listing/find-listing-by-id'
import { getOffersForListing } from '../../../src/crud/offer/get-offers-for-listing'
import { listingMock } from '../../mocks/listing-mock'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('CRUD - listing - addListing', () => {
  let id: string
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  afterEach(async () => {
    try {
      await deleteListing(id)
    } catch (_err) {
      // listing was never created, test must have failed
    }
  })

  it('add a listing', async () => {
    const { creator, items, targets } = listingMock['jUzMtPGKM62mMhEcmbN4']!
    id = await addListing({ creator, items, targets })
    const newListing = await findListingById(id)
    const offers = await getOffersForListing(items, targets)
    const now = dayjs()
    const expirationDate = now.add(DEFAULT_EXPIRATION_TIME, 'day')
    expect(newListing!.createdAt?.isAfter(now.subtract(1, 'minute'))).toBeTruthy()
    expect(newListing!.createdAt?.isBefore(now.add(1, 'minute'))).toBeTruthy()
    expect(newListing!.creator).toStrictEqual(creator)
    expect(newListing!.expiresAt?.isAfter(expirationDate.subtract(1, 'minute'))).toBeTruthy()
    expect(newListing!.expiresAt?.isBefore(expirationDate.add(1, 'minute'))).toBeTruthy()
    expect(newListing!.items).toStrictEqual(items)
    expect(newListing!.offers).toStrictEqual(offers)
    expect(newListing!.postedAt).toBeUndefined()
    expect(newListing!.state).toBe('OPEN')
    expect(newListing!.swaps).toEqual([])
    expect(newListing!.targets).toStrictEqual(targets)
  })
})
