import { getPendingOffersForReceiver } from '@echo/firestore/crud/offer/get-pending-offers-for-receiver'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getPendingOffersForReceiver', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('return an empty array if the receiver does not exist', async () => {
    const documents = await getPendingOffersForReceiver('not-found')
    expect(documents).toEqual([])
  })

  it('returns the pending offers for the receiver', async () => {
    let documents = await getPendingOffersForReceiver('crewnft_')
    expect(documents).toEqual([])
    documents = await getPendingOffersForReceiver('johnnycagewins')
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'))
  })
})
