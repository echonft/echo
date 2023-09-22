import { addListingPost } from '@echo/firestore/crud/listing-post/add-listing-post'
import { deleteListingPost } from '@echo/firestore/crud/listing-post/delete-listing-post'
import { findListingPostById } from '@echo/firestore/crud/listing-post/find-listing-post-by-id'
import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assertListingPosts } from '@test-utils/listing-post/assert-listing-posts'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - listing-post - addListingPost', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertListingPosts()
    await tearDownRemoteFirestoreTests()
  })
  it('throws if trying to add a post for a listing that does not exist', async () => {
    await expect(addListingPost('not-found', '1', '1')).rejects.toBeDefined()
  })
  it('add a listing post', async () => {
    const listingId = 'jUzMtPGKM62mMhEcmbN4'
    const { id } = await addListingPost(listingId, 'discordId', 'channelId')
    const newDocument = await findListingPostById(id)
    await deleteListingPost(id)
    expect(newDocument!.id).toStrictEqual(id)
    expect(newDocument!.listingId).toStrictEqual(listingId)
    expect(newDocument!.guild.discordId).toStrictEqual('discordId')
    expect(newDocument!.guild.channelId).toStrictEqual('channelId')
    expectDateIsNow(newDocument!.postedAt)
  })
})
