import { addOfferThread } from '@echo/firestore/crud/offer-thread/add-offer-thread'
import { getOfferThread } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import type { OfferThreadDiscordGuild } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { assertOfferThreads } from '@echo/firestore-test/offer-thread/assert-offer-threads'
import { deleteOfferThread } from '@echo/firestore-test/offer-thread/delete-offer-thread'
import { OFFER_MOCK_TO_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

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
    await expect(addOfferThread({ offerId: 'not-found', guild })).rejects.toBeDefined()
  })
  it('add an offer thread', async () => {
    const offerId = OFFER_MOCK_TO_JOHNNYCAGE_ID
    await addOfferThread({ offerId, guild })
    const newDocument = (await getOfferThread(offerId))!
    await deleteOfferThread(offerId)
    expect(newDocument.offerId).toStrictEqual(OFFER_MOCK_TO_JOHNNYCAGE_ID)
    expect(newDocument.guild).toStrictEqual(guild)
    expectDateNumberIsNow(newDocument.postedAt)
  })
})
