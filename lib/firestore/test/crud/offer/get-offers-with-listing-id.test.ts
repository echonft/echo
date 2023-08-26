import { getOffersWithListingId } from '../../../src/crud/offer/get-offers-with-listing-id'
import { getOfferMockById } from '../../mocks/get-offer-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getOffersWithListingId', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns an empty array there are no offer with the given listing', async () => {
    const listings = await getOffersWithListingId('not-found')
    expect(listings).toEqual([])
  })

  it('returns the offers when an id is found', async () => {
    const offers = await getOffersWithListingId('jUzMtPGKM62mMhEcmbN4')
    expect(offers.length).toBe(1)
    expect(offers[0]).toStrictEqual(getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'))
  })
})
