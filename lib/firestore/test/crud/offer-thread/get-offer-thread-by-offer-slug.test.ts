import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'
import { getOfferThreadByOfferSlug } from '@echo/firestore/crud/offer-thread/get-offer-thread-by-offer-slug'
import type { OfferThreadDocument } from '@echo/firestore/types/model/offer-thread-document'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { addOfferThread } from '@echo/test/firestore/crud/offer-thread/add-offer-thread'
import { deleteOfferThread } from '@echo/test/firestore/crud/offer-thread/delete-offer-thread'
import { offerDocumentMockToJohnnycageId } from '@echo/test/firestore/mocks'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - offer-thread - getOfferThreadByOfferSlug', () => {
  const data: OfferThreadDocument = {
    offerId: offerDocumentMockToJohnnycageId,
    guild: {
      channelId: 'channelId',
      id: 'discordId',
      threadId: 'threadId'
    },
    state: OfferThreadState.Active
  }
  let offerThreadId: Nullable<string>

  beforeEach(() => {
    offerThreadId = undefined
  })
  afterEach(async () => {
    if (!isNil(offerThreadId)) {
      await deleteOfferThread(offerThreadId)
    }
  })

  it('returns undefined if the document does not exist', async () => {
    await expect(getOfferThreadByOfferSlug('not-found')).resolves.toBeUndefined()
  })
  it('returns the document found', async () => {
    // TODO add offer
    offerThreadId = await addOfferThread(data)
    const document = await getOfferThreadByOfferSlug(offerMockToJohnnycage.slug)
    expect(document).toStrictEqual(data)
  })
})
