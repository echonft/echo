import { findListingPost } from '@echo/firestore/crud/listing-post/find-listing-post'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - listing-post - findListingPost', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  it('returns undefined if the document does not exist', async () => {
    const document = await findListingPost('not-found', 'not-found')
    expect(document).toBeUndefined()
  })
  it('returns the document found', async () => {
    const listingId = 'jUzMtPGKM62mMhEcmbN4'
    const guildId = '1'
    const document = await findListingPost(listingId, guildId)
    expect(document!.id).toStrictEqual('jXadAgs0rtUXZWfG9t0z')
    expect(document!.listingId).toStrictEqual(listingId)
    expect(document!.guild.discordId).toStrictEqual('1')
    expect(document!.guild.channelId).toStrictEqual('1')
  })
})
