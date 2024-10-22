import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'
import { archiveOfferThread } from '@echo/firestore/crud/offer-thread/archive-offer-thread'
import { getOfferThreadByOfferId } from '@echo/firestore/crud/offer-thread/get-offer-thread-by-offer-id'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { addOfferThread } from '@echo/test/firestore/crud/offer-thread/add-offer-thread'
import { deleteOfferThread } from '@echo/test/firestore/crud/offer-thread/delete-offer-thread'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil } from 'ramda'

describe('CRUD - offer-thread - addOfferThread', () => {
  let offerThreadId: Nullable<string>

  beforeEach(() => {
    offerThreadId = undefined
  })
  afterEach(async () => {
    if (!isNil(offerThreadId)) {
      await deleteOfferThread(offerThreadId)
    }
  })

  it('throws if the offer thread does not exist', async () => {
    await expect(archiveOfferThread('not-found')).rejects.toEqual(Error(OfferError.ThreadNotFound))
  })
  it('archive the offer thread', async () => {
    const data: Omit<OfferThreadDocumentData, 'state'> = {
      offerId: offerMockToJohnnycageId(),
      guild: {
        channelId: 'channelId',
        id: 'discordId',
        threadId: 'threadId'
      }
    }
    offerThreadId = await addOfferThread(data)
    await archiveOfferThread(data.offerId)
    const document = await getOfferThreadByOfferId(data.offerId)
    expect(document).toStrictEqual(assoc('state', OfferThreadState.Archived, data))
  })
})
