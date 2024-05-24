import {
  addOfferStateUpdate,
  type AddOfferStateUpdateArgs
} from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { addOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/add-offer-update-post'
import { getOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/get-offer-update-post'
import { deleteOfferUpdate } from '@echo/firestore-test/offer-update/delete-offer-update'
import { deleteOfferUpdatePost } from '@echo/firestore-test/offer-update-post/delete-offer-update-post'
import { unchecked_addOfferUpdatePost } from '@echo/firestore-test/offer-update-post/unchecked_add-offer-update-post'
import { OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import { OFFER_MOCK_TO_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'
import { USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - offer-update-post - addOfferUpdatePost', () => {
  const addOfferStateUpdateArgs: AddOfferStateUpdateArgs = {
    offerId: OFFER_MOCK_TO_JOHNNYCAGE_ID,
    args: {
      state: OFFER_STATE_REJECTED,
      trigger: {
        by: USER_MOCK_JOHNNY_USERNAME
      }
    }
  }
  let offerUpdateId: Nullable<string>
  let offerUpdatePostId: Nullable<string>

  beforeEach(() => {
    offerUpdateId = undefined
    offerUpdatePostId = undefined
  })
  afterEach(async () => {
    if (!isNil(offerUpdateId)) {
      try {
        await deleteOfferUpdate(offerUpdateId)
      } catch (e) {
        pinoLogger.error(`Error deleting offer update with id ${offerUpdateId}: ${errorMessage(e)}`)
      }
    }
    if (!isNil(offerUpdatePostId)) {
      try {
        await deleteOfferUpdatePost(offerUpdatePostId)
      } catch (e) {
        pinoLogger.error(`Error deleting offer update post with id ${offerUpdatePostId}: ${errorMessage(e)}`)
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
    const newDocument = (await getOfferUpdatePost(offerUpdateId))!
    expect(newDocument.offerUpdateId).toStrictEqual(offerUpdateId)
    expectDateNumberIsNow(newDocument.postedAt)
  })
})
