import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { offerMock } from '@echo/model-mocks/offer/offer-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - offer - findOfferById', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the offer is not found', async () => {
    const offer = await findOfferById('not-found')
    expect(offer).toBeUndefined()
  })

  it('returns the offer with the given id', async () => {
    const offer = await findOfferById('LyCfl6Eg7JKuD7XJ6IPi')
    expect(offer).toStrictEqual(offerMock.LyCfl6Eg7JKuD7XJ6IPi)
  })
})
