import { getOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/get-offer-update-post'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { OfferState } from '@echo/model/constants/offer-state'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { addOfferUpdatePost } from '@echo/test/firestore/crud/offer-update-post/add-offer-update-post'
import { deleteOfferUpdatePost } from '@echo/test/firestore/crud/offer-update-post/delete-offer-update-post'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - offer-update-post - addOfferUpdatePost', () => {
  const data = { offerId: offerMockToJohnnycageId(), state: OfferState.Accepted }
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
    offerUpdatePostId = await addOfferUpdatePost(data)
    await expect(addOfferUpdatePost(data)).rejects.toEqual(Error(OfferError.UpdatePostExists))
  })
  it('add an offer update post', async () => {
    offerUpdatePostId = await addOfferUpdatePost(data)
    const document = await getOfferUpdatePost(data)
    expect(document).toStrictEqual(data)
  })
})
