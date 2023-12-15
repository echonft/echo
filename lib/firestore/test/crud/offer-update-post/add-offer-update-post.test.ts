import {
  addOfferStateUpdate,
  type AddOfferStateUpdateArgs
} from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { addOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/add-offer-update-post'
import { findOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/find-offer-update-post'
import { assertOfferThreads } from '@echo/firestore-test/offer-thread/assert-offer-threads'
import { deleteOfferUpdate } from '@echo/firestore-test/offer-update/delete-offer-update'
import { deleteOfferUpdatePost } from '@echo/firestore-test/offer-update-post/delete-offer-update-post'
import { unchecked_addOfferUpdatePost } from '@echo/firestore-test/offer-update-post/unchecked_add-offer-update-post'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - offer-update-post - addOfferUpdatePost', () => {
  const addOfferStateUpdateArgs: AddOfferStateUpdateArgs = {
    offerId: 'LyCfl6Eg7JKuD7XJ6IPi',
    args: {
      state: OFFER_STATE_REJECTED,
      trigger: {
        by: 'johnnycagewins'
      }
    }
  }
  let offerUpdateId: string | undefined
  let offerUpdatePostId: string | undefined
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertOfferThreads()
    await tearDownRemoteFirestoreTests()
  })
  beforeEach(() => {
    offerUpdateId = undefined
    offerUpdatePostId = undefined
  })
  afterEach(async () => {
    if (!isNil(offerUpdateId)) {
      try {
        await deleteOfferUpdate(offerUpdateId)
        offerUpdateId = undefined
      } catch (e) {
        logger.error(`Error deleting offer update with id ${offerUpdateId}: ${errorMessage(e)}`)
      }
    }
    if (!isNil(offerUpdatePostId)) {
      try {
        await deleteOfferUpdatePost(offerUpdatePostId)
        offerUpdatePostId = undefined
      } catch (e) {
        logger.error(`Error deleting offer update post with id ${offerUpdatePostId}: ${errorMessage(e)}`)
      }
    }
  })
  it('throws if trying to add an offer update post for an offer update that does not exist', async () => {
    await expect(addOfferUpdatePost('not-found')).rejects.toBeDefined()
  })
  it('throws if trying to add an offer update post that already exists', async () => {
    const { id } = await unchecked_addOfferUpdatePost('offer-update-post-id')
    offerUpdateId = id
    await expect(addOfferUpdatePost('offer-update-post-id')).rejects.toBeDefined()
  })
  it('add an offer update pos', async () => {
    const { id } = await addOfferStateUpdate(addOfferStateUpdateArgs)
    offerUpdateId = id
    const addedOfferUpdatePost = await addOfferUpdatePost(id)
    offerUpdatePostId = addedOfferUpdatePost.id
    const newDocument = (await findOfferUpdatePost(offerUpdateId))!
    expect(newDocument.id).toStrictEqual(offerUpdatePostId)
    expect(newDocument.offerUpdateId).toStrictEqual(offerUpdateId)
    expectDateNumberIsNow(newDocument.postedAt)
  })
})
