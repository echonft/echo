import { deleteOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/delete-offer-thread-close-request'
import { findOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/find-offer-thread-close-request'
import { expectDateNumberIsNow } from '@echo/test-utils/expect-date-number-is-now'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertOfferThreads } from '@test-utils/offer-thread/assert-offer-threads'
import { unchecked_addOfferThreadCloseRequest } from '@test-utils/offer-thread-close-request/unchecked_add-offer-thread-close-request'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { isNil } from 'ramda'

describe('CRUD - offer-thread-close-request - findOfferThreadCloseRequest', () => {
  let newDocumentId: string | undefined
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
  it('returns undefined if the document is not found', async () => {
    const emptyDocument = await findOfferThreadCloseRequest('not-found')
    expect(emptyDocument).toBeUndefined()
  })
  it('returns the document when found', async () => {
    const offerThreadId = 'offer-thread-id'
    const { id } = await unchecked_addOfferThreadCloseRequest(offerThreadId)
    newDocumentId = id
    const newDocument = (await findOfferThreadCloseRequest(offerThreadId))!
    expect(newDocument.id).toStrictEqual(id)
    expect(newDocument.offerThreadId).toStrictEqual(offerThreadId)
    expectDateNumberIsNow(newDocument.closeAt)
  })
})
