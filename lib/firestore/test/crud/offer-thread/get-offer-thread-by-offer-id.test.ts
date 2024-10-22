import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'
import { getOfferThreadByOfferId } from '@echo/firestore/crud/offer-thread/get-offer-thread-by-offer-id'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { addOfferThread } from '@echo/test/firestore/crud/offer-thread/add-offer-thread'
import { deleteOfferThread } from '@echo/test/firestore/crud/offer-thread/delete-offer-thread'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil } from 'ramda'

describe('CRUD - offer-thread - getOfferThreadByOfferId', () => {
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
    await expect(getOfferThreadByOfferId('not-found')).resolves.toBeUndefined()
  })
  it('returns the document found', async () => {
    offerThreadId = await addOfferThread(data)
    const document = await getOfferThreadByOfferId(data.offerId)
    expect(document).toStrictEqual(assoc('state', OfferThreadState.Active, data))
  })
})
