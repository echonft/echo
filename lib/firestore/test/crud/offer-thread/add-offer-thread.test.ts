import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'
import { addOfferThread } from '@echo/firestore/crud/offer-thread/add-offer-thread'
import { getOfferThreadByOfferId } from '@echo/firestore/crud/offer-thread/get-offer-thread-by-offer-id'
import type { OfferThreadDocument } from '@echo/firestore/types/model/offer-thread-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { deleteOfferThread } from '@echo/test/firestore/crud/offer-thread/delete-offer-thread'
import { offerDocumentMockToJohnnycageId } from '@echo/test/firestore/mocks'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - offer-thread - addOfferThread', () => {
  const data: Omit<OfferThreadDocument, 'state'> = {
    offerId: offerDocumentMockToJohnnycageId,
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

  it('throws if the offer does not exist', async () => {
    await expect(pipe(assoc('offerId', 'not-found'), addOfferThread)(data)).rejects.toEqual(Error(OfferError.NotFound))
  })

  it('add an offer thread', async () => {
    const { id } = await addOfferThread(data)
    offerThreadId = id
    const document = await getOfferThreadByOfferId(data.offerId)
    expect(document).toStrictEqual(assoc('state', OfferThreadState.Active, data))
  })
})
