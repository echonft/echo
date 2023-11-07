import { deleteOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/delete-offer-thread-close-request'
import { getAllOfferThreadCloseRequests } from '@echo/firestore/crud/offer-thread-close-request/get-all-offer-thread-close-requests'
import type { OfferThreadCloseRequest } from '@echo/firestore/types/model/offer-thread-close-request/offer-thread-close-request'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertOfferThreads } from '@test-utils/offer-thread/assert-offer-threads'
import { unchecked_addOfferThreadCloseRequest } from '@test-utils/offer-thread-close-request/unchecked_add-offer-thread-close-request'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { append, find, isEmpty, propEq } from 'ramda'

describe('CRUD - offer-thread-close-request - getAllOfferThreadCloseRequests', () => {
  let documents: OfferThreadCloseRequest[]
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertOfferThreads()
    await tearDownRemoteFirestoreTests()
  })
  beforeEach(() => {
    documents = []
  })
  afterEach(async () => {
    if (!isEmpty(documents)) {
      for (const document of documents) {
        try {
          await deleteOfferThreadCloseRequest(document.id)
        } catch (e) {
          logger.error(`Error deleting offer thread close request with id ${document.id}: ${errorMessage(e)}`)
        }
      }
      documents = []
    }
  })
  it('returns an empty array if there are no requests in the db', async () => {
    documents = await getAllOfferThreadCloseRequests()
    expect(documents).toStrictEqual([])
  })
  it('returns all requests in the db', async () => {
    const document1 = await unchecked_addOfferThreadCloseRequest('1')
    documents = append(document1, documents)
    const document2 = await unchecked_addOfferThreadCloseRequest('2')
    documents = append(document2, documents)
    const document3 = await unchecked_addOfferThreadCloseRequest('3')
    documents = append(document3, documents)
    const foundDocuments = await getAllOfferThreadCloseRequests()
    expect(foundDocuments.length).toBe(3)
    for (const document of documents) {
      expect(find(propEq(document.id, 'id'), documents)).toStrictEqual(document)
    }
  })
})
