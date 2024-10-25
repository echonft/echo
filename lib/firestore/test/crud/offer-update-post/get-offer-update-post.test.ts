import { getOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/get-offer-update-post'
import { OfferState } from '@echo/model/constants/offer-state'
import { addOfferUpdatePost } from '@echo/test/firestore/crud/offer-update-post/add-offer-update-post'
import { deleteOfferUpdatePost } from '@echo/test/firestore/crud/offer-update-post/delete-offer-update-post'
import { offerDocumentMockToJohnnycageId } from '@echo/test/firestore/initialize-db'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - offer-update-post - getOfferUpdatePost', () => {
  const data = { offerId: offerDocumentMockToJohnnycageId, state: OfferState.Accepted }
  let offerUpdatePostId: Nullable<string>

  beforeEach(() => {
    offerUpdatePostId = undefined
  })
  afterEach(async () => {
    if (!isNil(offerUpdatePostId)) {
      await deleteOfferUpdatePost(offerUpdatePostId)
      offerUpdatePostId = undefined
    }
  })

  it('returns the proper document if found', async () => {
    offerUpdatePostId = await addOfferUpdatePost(data)
    const document = await getOfferUpdatePost(data)
    expect(document).toStrictEqual(data)
  })

  it('returns undefined if no document is found', async () => {
    offerUpdatePostId = await addOfferUpdatePost(data)
    await expect(pipe(assoc('offerId', 'not-found'), getOfferUpdatePost)(data)).resolves.toBeUndefined()
    await expect(pipe(assoc('state', OfferState.Cancelled), getOfferUpdatePost)(data)).resolves.toBeUndefined()
  })
})
