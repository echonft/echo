import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'
import { addOfferThread } from '@echo/firestore/crud/offer-thread/add-offer-thread'
import { getOfferThread } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { deleteOfferThread } from '@echo/test/firestore/crud/offer-thread/delete-offer-thread'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - offer-thread - addOfferThread', () => {
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

  it('throws if the offer does not exist', async () => {
    await expect(pipe(assoc('offerId', 'not-found'), addOfferThread)(data)).rejects.toEqual(Error(OfferError.NotFound))
  })

  it('add an offer thread', async () => {
    const { id } = await addOfferThread(data)
    offerThreadId = id
    const document = await getOfferThread(data.offerId)
    expect(document).toStrictEqual(assoc('state', OfferThreadState.Active, data))
  })
})
