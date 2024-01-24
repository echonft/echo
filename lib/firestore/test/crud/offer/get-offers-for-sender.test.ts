import { getOffersForSender } from '@echo/firestore/crud/offer/get-offers-for-sender'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getOffersForSender', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('return an empty array if the sender does not exist', async () => {
    const documents = await getOffersForSender('not-found')
    expect(documents).toEqual([])
  })

  it('returns the offers for the sender', async () => {
    let documents = await getOffersForSender('crewnft_')
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'))
    documents = await getOffersForSender('johnnycagewins')
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById('ASkFpKoHEHVH0gd69t1G'))
  })
})
