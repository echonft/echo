import { addOfferThread } from '@echo/firestore/crud/offer-thread/add-offer-thread'
import { findOfferThreadById } from '@echo/firestore/crud/offer-thread/find-offer-thread-by-id'
import type { OfferThreadDiscordGuild } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { assertOfferThreads } from '@echo/firestore-test/offer-thread/assert-offer-threads'
import { deleteOfferThread } from '@echo/firestore-test/offer-thread/delete-offer-thread'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - offer-thread - addOfferThread', () => {
  const guild: OfferThreadDiscordGuild = {
    channelId: 'channelId',
    threadId: 'threadId',
    discordId: 'discordId'
  }
  beforeAll(async () => {
    await assertOfferThreads()
  })
  afterAll(async () => {
    await assertOfferThreads()
  })
  it('throws if trying to add a thread for an offer that does not exist', async () => {
    await expect(addOfferThread('not-found', guild)).rejects.toBeDefined()
  })
  it('add an offer thread', async () => {
    const { id } = await addOfferThread('LyCfl6Eg7JKuD7XJ6IPi', guild)
    const newDocument = (await findOfferThreadById(id))!
    await deleteOfferThread(id)
    expect(newDocument.id).toStrictEqual(id)
    expect(newDocument.offerId).toStrictEqual('LyCfl6Eg7JKuD7XJ6IPi')
    expect(newDocument.guild).toStrictEqual(guild)
    expectDateNumberIsNow(newDocument.postedAt)
  })
})
