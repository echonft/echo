import { getCompletedOffersForCollection } from '@echo/firestore/crud/offer/get-completed-offers-for-collection'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getCompletedOffersForCollection', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('return an empty array if the collection does not exist', async () => {
    const documents = await getCompletedOffersForCollection('not-found')
    expect(documents).toEqual([])
  })

  it('returns the completed offers for which the collection is included in the receiver or sender items', async () => {
    const documents = await getCompletedOffersForCollection('pxmythics-genesis')
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById('ASkFpKoHEHVH0gd69t1G'))
  })
})
