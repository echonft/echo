import { addOfferThread } from '@echo/firestore/crud/offer-thread/add-offer-thread'
import { getOfferThread } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import type { OfferThread, OfferThreadDiscordGuild } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { assertOfferThreads } from '@echo/firestore-test/offer-thread/assert-offer-threads'
import { deleteOfferThread } from '@echo/firestore-test/offer-thread/delete-offer-thread'
import { offerMockToJohnnycageId } from '@echo/model-mocks/offer/offer-mock'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

describe('CRUD - offer-thread - addOfferThread', () => {
  const guild: OfferThreadDiscordGuild = {
    channelId: 'channelId',
    id: 'discordId',
    threadId: 'threadId'
  }
  beforeAll(async () => {
    await assertOfferThreads()
  })
  afterAll(async () => {
    await assertOfferThreads()
  })
  it('throws if trying to add a thread for an offer that does not exist', async () => {
    await expect(addOfferThread({ offerId: 'not-found', guild, state: 'ACTIVE' })).rejects.toBeDefined()
  })
  it('add an offer thread', async () => {
    const offerId = offerMockToJohnnycageId()
    const offerThread: Omit<OfferThread, 'postedAt'> = { offerId, guild, state: 'ACTIVE' }
    await addOfferThread(offerThread)
    const document = (await getOfferThread(offerId))!
    await deleteOfferThread(offerId)
    expect(omit(['postedAt'], document)).toStrictEqual(offerThread)
    expectDateNumberIsNow(document.postedAt)
  })
})
