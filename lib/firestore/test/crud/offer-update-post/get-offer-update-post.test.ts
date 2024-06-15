import { deleteOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/delete-offer-update-post'
import { getOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/get-offer-update-post'
import { unchecked_addOfferUpdatePost } from '@echo/firestore/utils/offer-update-post/unchecked_add-offer-update-post'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - offer-update-post - getOfferUpdatePost', () => {
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
  it('returns undefined if no document is found', async () => {
    const foundDocument = await getOfferUpdatePost('not-found')
    expect(foundDocument).toBeUndefined()
  })
  it('returns the proper document if found', async () => {
    const newDocument = await unchecked_addOfferUpdatePost('id')
    offerUpdatePostId = newDocument.id
    const foundDocument = await getOfferUpdatePost('id')
    expect(foundDocument).toStrictEqual(newDocument.data)
  })
})
