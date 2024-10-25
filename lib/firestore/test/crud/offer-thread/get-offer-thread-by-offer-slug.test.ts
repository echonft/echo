import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'
import { getOfferThreadByOfferSlug } from '@echo/firestore/crud/offer-thread/get-offer-thread-by-offer-slug'
import { offerMockToJohnnycageId } from '@echo/firestore/mocks/db-model/offer-document-data-mock'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import { offerMockToJohnnycageSlug } from '@echo/model/mocks/offer-mock'
import { addOfferThread } from '@echo/test/firestore/crud/offer-thread/add-offer-thread'
import { deleteOfferThread } from '@echo/test/firestore/crud/offer-thread/delete-offer-thread'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil } from 'ramda'

describe('CRUD - offer-thread - getOfferThreadByOfferSlug', () => {
  const data: Omit<OfferThreadDocumentData, 'state'> = {
    offerId: offerMockToJohnnycageId(),
    guild: {
      channelId: 'channelId',
      id: 'discordId',
      threadId: 'threadId'
    }
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
    const document = await getOfferThreadByOfferSlug(offerMockToJohnnycageSlug())
    expect(document).toStrictEqual(assoc('state', OfferThreadState.Active, data))
  })
})
