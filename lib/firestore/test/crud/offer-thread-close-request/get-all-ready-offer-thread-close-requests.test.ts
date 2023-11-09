import { deleteOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/delete-offer-thread-close-request'
import { getAllReadyOfferThreadCloseRequests } from '@echo/firestore/crud/offer-thread-close-request/get-all-ready-offer-thread-close-requests'
import type { OfferThreadCloseRequest } from '@echo/firestore/types/model/offer-thread-close-request/offer-thread-close-request'
import { assertOfferThreads } from '@echo/firestore-test/offer-thread/assert-offer-threads'
import { unchecked_addOfferThreadCloseRequest } from '@echo/firestore-test/offer-thread-close-request/unchecked_add-offer-thread-close-request'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { append, find, isEmpty, propEq } from 'ramda'

describe('CRUD - offer-thread-close-request - getAllReadyOfferThreadCloseRequests', () => {
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
    documents = await getAllReadyOfferThreadCloseRequests()
    expect(documents).toStrictEqual([])
  })
  it('returns all requests in the db', async () => {
    const readyCloseAt = dayjs().subtract(1, 'h').unix()
    const document1 = await unchecked_addOfferThreadCloseRequest('1', readyCloseAt)
    documents = append(document1, documents)
    const document2 = await unchecked_addOfferThreadCloseRequest('2', readyCloseAt)
    documents = append(document2, documents)
    const document3 = await unchecked_addOfferThreadCloseRequest('3', readyCloseAt)
    documents = append(document3, documents)
    const notReadyCloseAt = dayjs().add(1, 'h').unix()
    const document4 = await unchecked_addOfferThreadCloseRequest('4', notReadyCloseAt)
    documents = append(document4, documents)
    const document5 = await unchecked_addOfferThreadCloseRequest('5', notReadyCloseAt)
    documents = append(document5, documents)
    const foundDocuments = await getAllReadyOfferThreadCloseRequests()
    expect(foundDocuments.length).toBe(3)
    for (const foundDocument of foundDocuments) {
      expect(find(propEq(foundDocument.id, 'id'), documents)).toStrictEqual(foundDocument)
    }
  })
})
