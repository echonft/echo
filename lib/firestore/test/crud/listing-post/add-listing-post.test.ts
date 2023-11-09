import { addListingPost } from '@echo/firestore/crud/listing-post/add-listing-post'
import type { ListingPostDiscordGuild } from '@echo/firestore/types/model/listing-post/listing-post'
import { assertListingPosts } from '@echo/firestore-test/listing-post/assert-listing-posts'
import { deleteListingPost } from '@echo/firestore-test/listing-post/delete-listing-post'
import { findListingPostById } from '@echo/firestore-test/listing-post/find-listing-post-by-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - listing-post - addListingPost', () => {
  const guild: ListingPostDiscordGuild = { discordId: 'discordId', channelId: 'channelId' }
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertListingPosts()
    await tearDownRemoteFirestoreTests()
  })
  it('throws if trying to add a post for a listing that does not exist', async () => {
    await expect(addListingPost('not-found', guild)).rejects.toBeDefined()
  })
  it('add a listing post', async () => {
    const listingId = 'jUzMtPGKM62mMhEcmbN4'
    const { id } = await addListingPost(listingId, guild)
    const newDocument = (await findListingPostById(id))!
    await deleteListingPost(id)
    expect(newDocument.id).toStrictEqual(id)
    expect(newDocument.listingId).toStrictEqual(listingId)
    expect(newDocument.guild).toStrictEqual(guild)
    expectDateNumberIsNow(newDocument.postedAt)
  })
})
