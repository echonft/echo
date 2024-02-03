import { addOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/add-offer-thread-close-request'
import { deleteOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/delete-offer-thread-close-request'
import { assertOfferThreads } from '@echo/firestore-test/offer-thread/assert-offer-threads'
import { findOfferThreadCloseRequestById } from '@echo/firestore-test/offer-thread-close-request/find-offer-thread-close-request-by-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { now } from '@echo/utils/helpers/now'
import { logger } from '@echo/utils/services/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - offer-thread-close-request - addOfferThreadCloseRequest', () => {
  const offerThreadId = 'hot4VWDzd6ZRsC3nsvnb'
  let newDocumentId: Nullable<string>
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertOfferThreads()
    await tearDownRemoteFirestoreTests()
  })
  beforeEach(() => {
    newDocumentId = undefined
  })
  afterEach(async () => {
    if (!isNil(newDocumentId)) {
      try {
        await deleteOfferThreadCloseRequest(newDocumentId)
        newDocumentId = undefined
      } catch (e) {
        logger.error(`Error deleting offer thread close request with id ${newDocumentId}: ${errorMessage(e)}`)
      }
    }
  })
  it('throws if trying to add a close request for an offer thread that does not exist', async () => {
    await expect(addOfferThreadCloseRequest('not-found', now())).rejects.toBeDefined()
  })
  it('add an offer thread close request', async () => {
    const { id } = await addOfferThreadCloseRequest(offerThreadId, now())
    newDocumentId = id
    const newDocument = (await findOfferThreadCloseRequestById(id))!
    expect(newDocument.id).toStrictEqual(id)
    expect(newDocument.offerThreadId).toStrictEqual(offerThreadId)
    expectDateNumberIsNow(newDocument.closeAt)
  })
  it('returns the existing close request tied to offer thread id if trying to add it again', async () => {
    const { id } = await addOfferThreadCloseRequest(offerThreadId, now())
    newDocumentId = id
    const newDocument = (await findOfferThreadCloseRequestById(id))!
    const sameDocument = await addOfferThreadCloseRequest(offerThreadId, now())
    expect(sameDocument).toStrictEqual(newDocument)
  })
})
