import { getOffersForReceiver } from '../../../src/crud/offer/get-offers-for-receiver'
import { getOfferMockById } from '../../mocks/get-offer-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getOffersForReceiver', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns an empty array if no offers are found', async () => {
    const offers = await getOffersForReceiver('6rECUMhevHfxABZ1VNOm')
    expect(offers).toEqual([])
  })

  it('returns the offers for the receiver', async () => {
    const offers = await getOffersForReceiver('oE6yUEQBPn7PZ89yMjKn')
    expect(offers.length).toBe(1)
    expect(offers[0]).toStrictEqual(getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'))
  })

  it('returns the offers for the receiver filtered by state', async () => {
    const empty = await getOffersForReceiver('oE6yUEQBPn7PZ89yMjKn', 'COMPLETED')
    expect(empty).toEqual([])
    const offers = await getOffersForReceiver('oE6yUEQBPn7PZ89yMjKn', 'OPEN')
    expect(offers.length).toBe(1)
    expect(offers[0]).toStrictEqual(getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'))
  })
})
