import { findOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/find-offer-update-post'
import { assertOfferThreads } from '@echo/firestore-test/offer-thread/assert-offer-threads'
import { deleteOfferUpdatePost } from '@echo/firestore-test/offer-update-post/delete-offer-update-post'
import { unchecked_addOfferUpdatePost } from '@echo/firestore-test/offer-update-post/unchecked_add-offer-update-post'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - offer-update - findOfferStateUpdate', () => {
  let offerUpdatePostId: string | undefined
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertOfferThreads()
    await tearDownRemoteFirestoreTests()
  })
  beforeEach(() => {
    offerUpdatePostId = undefined
  })
  afterEach(async () => {
    if (!isNil(offerUpdatePostId)) {
      try {
        await deleteOfferUpdatePost(offerUpdatePostId)
        offerUpdatePostId = undefined
      } catch (e) {
        logger.error(`Error deleting offer update post with id ${offerUpdatePostId}: ${errorMessage(e)}`)
      }
    }
  })
  it('returns undefined if no document is found', async () => {
    const foundDocument = await findOfferUpdatePost('not-found')
    expect(foundDocument).toBeUndefined()
  })
  it('returns the proper document if found', async () => {
    const newDocument = await unchecked_addOfferUpdatePost('id')
    offerUpdatePostId = newDocument.id
    const foundDocument = await findOfferUpdatePost('id')
    expect(foundDocument).toStrictEqual(newDocument)
  })
})
