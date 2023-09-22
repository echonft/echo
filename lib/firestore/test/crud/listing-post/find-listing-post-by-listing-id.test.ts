import { findListingPostByListingId } from '@echo/firestore/crud/listing-post/find-listing-post-by-listing-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - listing-post - findListingPostByListingId', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  it('returns undefined if the document does not exist', async () => {
    const document = await findListingPostByListingId('not-found')
    expect(document).toBeUndefined()
  })
  it('returns the document found', async () => {
    const listingId = 'jUzMtPGKM62mMhEcmbN4'
    const document = await findListingPostByListingId(listingId)
    expect(document!.id).toStrictEqual('hot4VWDzd6ZRsC3nsvnb')
    expect(document!.listingId).toStrictEqual(listingId)
    expect(document!.guild.discordId).toStrictEqual('1')
    expect(document!.guild.channelId).toStrictEqual('1')
  })
})
