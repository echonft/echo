import { deleteOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/delete-offer-thread-close-request'
import { getAllOfferThreadCloseRequests } from '@echo/firestore/crud/offer-thread-close-request/get-all-offer-thread-close-requests'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertOfferThreads } from '@test-utils/offer-thread/assert-offer-threads'
import { uncheckedAddOfferThreadCloseRequest } from '@test-utils/offer-thread-close-request/unchecked-add-offer-thread-close-request'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { append, find, isEmpty, propEq } from 'ramda'

describe('CRUD - offer-thread-close-request - getAllOfferThreadCloseRequests', () => {
  let documentIds: string[]
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertOfferThreads()
    await tearDownRemoteFirestoreTests()
  })
  beforeEach(() => {
    documentIds = []
  })
  afterEach(async () => {
    if (!isEmpty(documentIds)) {
      for (const documentId of documentIds) {
        try {
          await deleteOfferThreadCloseRequest(documentId)
        } catch (e) {
          logger.error(`Error deleting offer thread close request with id ${documentId}: ${errorMessage(e)}`)
        }
      }
      documentIds = []
    }
  })
  it('returns an empty array if there are no requests in the db', async () => {
    const documents = await getAllOfferThreadCloseRequests()
    expect(documents).toStrictEqual([])
  })
  it('returns all requests in the db', async () => {
    const document1 = await uncheckedAddOfferThreadCloseRequest('1')
    documentIds = append(document1.id, documentIds)
    const document2 = await uncheckedAddOfferThreadCloseRequest('2')
    documentIds = append(document2.id, documentIds)
    const document3 = await uncheckedAddOfferThreadCloseRequest('3')
    documentIds = append(document3.id, documentIds)
    const documents = await getAllOfferThreadCloseRequests()
    expect(documents.length).toBe(3)
    for (const documentId of documentIds) {
      expect(find(propEq(documentId, 'id'), documents)).toBeDefined()
    }
  })
})
