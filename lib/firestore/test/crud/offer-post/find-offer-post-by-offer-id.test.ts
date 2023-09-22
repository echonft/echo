import { findOfferPostByOfferId } from '@echo/firestore/crud/offer-post/find-offer-post-by-offer-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - offer-post - findOfferPostByOfferId', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  it('returns undefined if the document does not exist', async () => {
    const document = await findOfferPostByOfferId('not-found')
    expect(document).toBeUndefined()
  })
  it('returns the document found', async () => {
    const offerId = 'ASkFpKoHEHVH0gd69t1G'
    const document = await findOfferPostByOfferId(offerId)
    expect(document!.id).toStrictEqual('hot4VWDzd6ZRsC3nsvnb')
    expect(document!.offerId).toStrictEqual(offerId)
    expect(document!.guild.discordId).toStrictEqual('100')
    expect(document!.guild.threadId).toStrictEqual('1')
  })
})
