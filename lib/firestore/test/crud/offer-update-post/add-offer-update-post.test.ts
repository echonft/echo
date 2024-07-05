import { addOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/add-offer-update-post'
import { deleteOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/delete-offer-update-post'
import { getOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/get-offer-update-post'
import {
  addOfferStateUpdate,
  type AddOfferStateUpdateArgs
} from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { deleteOfferUpdate } from '@echo/firestore/crud/offer-update/delete-offer-update'
import { unchecked_addOfferUpdatePost } from '@echo/firestore/utils/offer-update-post/unchecked_add-offer-update-post'
import { OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

describe('CRUD - offer-update-post - addOfferUpdatePost', () => {
  const addOfferStateUpdateArgs: AddOfferStateUpdateArgs = {
    offerId: offerMockToJohnnycageId(),
    args: {
      state: OFFER_STATE_REJECTED
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
      await deleteOfferUpdate(offerUpdateId)
    }
    if (!isNil(offerUpdatePostId)) {
      await deleteOfferUpdatePost(offerUpdatePostId)
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
    expect(dayjs.unix(newDocument.postedAt).isAfter(dayjs().subtract(1, 'minute'))).toBeTruthy()
    expect(dayjs.unix(newDocument.postedAt).isBefore(dayjs().add(1, 'minute'))).toBeTruthy()
  })
})
