import { getCompletedOffersForUser } from '@echo/firestore/crud/offer/get-completed-offers-for-user'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getCompletedOffersForUser', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('return an empty array if the user does not exist', async () => {
    const documents = await getCompletedOffersForUser('not-found')
    expect(documents).toEqual([])
  })

  it('returns the completed offers for the user', async () => {
    let documents = await getCompletedOffersForUser('johnnycagewins')
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById('ASkFpKoHEHVH0gd69t1G'))
    documents = await getCompletedOffersForUser('crewnft_')
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById('ASkFpKoHEHVH0gd69t1G'))
  })
})
