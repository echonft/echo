import { findOfferThread } from '@echo/firestore/crud/offer-thread/find-offer-thread'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - offer-thread - findOfferThread', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  it('returns undefined if the document does not exist', async () => {
    const document = await findOfferThread('not-found')
    expect(document).toBeUndefined()
  })
  it('returns the document found', async () => {
    const offerId = 'ASkFpKoHEHVH0gd69t1G'
    const document = await findOfferThread(offerId)
    expect(document!.id).toStrictEqual('hot4VWDzd6ZRsC3nsvnb')
    expect(document!.offerId).toStrictEqual(offerId)
    expect(document!.guild.channelId).toStrictEqual('10')
    expect(document!.guild.discordId).toStrictEqual('100')
    expect(document!.guild.threadId).toStrictEqual('1')
  })
})
