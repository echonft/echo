import { addOfferThread } from '@echo/firestore/crud/offer-thread/add-offer-thread'
import { deleteOfferThread } from '@echo/firestore/crud/offer-thread/delete-offer-thread'
import { getOfferThread } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { omit } from 'ramda'

describe('CRUD - offer-thread - addOfferThread', () => {
  const guild: OfferThreadDocumentData['guild'] = {
    channelId: 'channelId',
    id: 'discordId',
    threadId: 'threadId'
  }
  it('throws if trying to add a thread for an offer that does not exist', async () => {
    await expect(addOfferThread({ offerId: 'not-found', guild, state: 'ACTIVE' })).rejects.toBeDefined()
  })
  it('add an offer thread', async () => {
    const offerId = offerMockToJohnnycageId()
    const offerThread: Omit<OfferThreadDocumentData, 'postedAt'> = { offerId, guild, state: 'ACTIVE' }
    await addOfferThread(offerThread)
    const document = (await getOfferThread(offerId))!
    await deleteOfferThread(offerId)
    expect(omit(['postedAt'], document)).toStrictEqual(offerThread)
    expect(dayjs.unix(document.postedAt).isAfter(dayjs().subtract(1, 'minute'))).toBeTruthy()
    expect(dayjs.unix(document.postedAt).isBefore(dayjs().add(1, 'minute'))).toBeTruthy()
  })
})
