import { addOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/add-offer-update-post'
import { getOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/get-offer-update-post'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { OfferState } from '@echo/model/constants/offer-state'
import { addOfferUpdatePost as testAddOfferUpdatePost } from '@echo/test/firestore/crud/offer-update-post/add-offer-update-post'
import { deleteOfferUpdatePost } from '@echo/test/firestore/crud/offer-update-post/delete-offer-update-post'
import { offerDocumentMockToJohnnycageId } from '@echo/test/firestore/initialize-db'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - offer-update-post - addOfferUpdatePost', () => {
  const data = { offerId: offerDocumentMockToJohnnycageId, state: OfferState.Accepted }
  let offerUpdatePostId: Nullable<string>

  beforeEach(() => {
    offerUpdatePostId = undefined
  })
  afterEach(async () => {
    if (!isNil(offerUpdatePostId)) {
      await deleteOfferUpdatePost(offerUpdatePostId)
    }
  })
  it('throws if the offer that does exist', async () => {
    await expect(addOfferUpdatePost({ offerId: 'not-found', state: OfferState.Accepted })).rejects.toEqual(
      Error(OfferError.NotFound)
    )
  })
  it('throws if offer update post already exists', async () => {
    offerUpdatePostId = await testAddOfferUpdatePost(data)
    await expect(addOfferUpdatePost(data)).rejects.toEqual(Error(OfferError.UpdatePostExists))
  })
  it('add an offer update post', async () => {
    offerUpdatePostId = await testAddOfferUpdatePost(data)
    const document = await getOfferUpdatePost(data)
    expect(document).toStrictEqual(data)
  })
})
