import { deleteOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/delete-offer-thread-close-request'
import { assertOfferThreads } from '@echo/firestore-test/offer-thread/assert-offer-threads'
import { findOfferThreadCloseRequestById } from '@echo/firestore-test/offer-thread-close-request/find-offer-thread-close-request-by-id'
import { unchecked_addOfferThreadCloseRequest } from '@echo/firestore-test/offer-thread-close-request/unchecked_add-offer-thread-close-request'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - offer-thread-close-request - deleteOfferThreadCloseRequest', () => {
  beforeAll(async () => {
    await assertOfferThreads()
  })
  afterAll(async () => {
    await assertOfferThreads()
  })
  it('existing document gets deleted', async () => {
    const { id } = await unchecked_addOfferThreadCloseRequest('offer-thread-id')
    const newDocument = (await findOfferThreadCloseRequestById(id))!
    expect(newDocument).toBeDefined()
    await deleteOfferThreadCloseRequest(id)
    const emptyDocument = (await findOfferThreadCloseRequestById(id))!
    expect(emptyDocument).toBeUndefined()
  })
})
