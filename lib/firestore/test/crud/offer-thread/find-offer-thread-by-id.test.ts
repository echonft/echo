import { findOfferThread } from '@echo/firestore/crud/offer-thread/find-offer-thread'
import { findOfferThreadById } from '@echo/firestore/crud/offer-thread/find-offer-thread-by-id'
import { getOfferThreadMockById } from '@echo/firestore-mocks/offer-thread/get-offer-thread-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - offer-thread - findOfferThread', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  it('returns undefined if the document does not exist', async () => {
    const document = await findOfferThread('not-found')
    expect(document).toBeUndefined()
  })
  it('returns the document found', async () => {
    const offerThreadId = 'hot4VWDzd6ZRsC3nsvnb'
    const document = await findOfferThreadById(offerThreadId)
    expect(document).toStrictEqual(getOfferThreadMockById(offerThreadId))
  })
})
