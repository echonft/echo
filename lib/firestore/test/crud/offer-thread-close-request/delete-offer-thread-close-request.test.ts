import { deleteOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/delete-offer-thread-close-request'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assertOfferThreads } from '@test-utils/offer-thread/assert-offer-threads'
import { findOfferThreadCloseRequestById } from '@test-utils/offer-thread-close-request/find-offer-thread-close-request-by-id'
import { uncheckedAddOfferThreadCloseRequest } from '@test-utils/offer-thread-close-request/unchecked-add-offer-thread-close-request'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - offer-thread-close-request - deleteOfferThreadCloseRequest', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertOfferThreads()
    await tearDownRemoteFirestoreTests()
  })
  it('existing document gets deleted', async () => {
    const { id } = await uncheckedAddOfferThreadCloseRequest('offer-thread-id')
    const newDocument = (await findOfferThreadCloseRequestById(id))!
    expect(newDocument).toBeDefined()
    await deleteOfferThreadCloseRequest(id)
    const emptyDocument = (await findOfferThreadCloseRequestById(id))!
    expect(emptyDocument).toBeUndefined()
  })
})
