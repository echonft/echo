import { addListingPost } from '@echo/firestore/crud/listing-post/add-listing-post'
import { getListingPost } from '@echo/firestore/crud/listing-post/get-listing-post'
import type { ListingPostDiscordGuild } from '@echo/firestore/types/model/listing-post/listing-post'
import { assertListingPosts } from '@echo/firestore-test/listing-post/assert-listing-posts'
import { deleteListingPost } from '@echo/firestore-test/listing-post/delete-listing-post'
import { LISTING_MOCK_ID } from '@echo/model-mocks/listing/listing-mock'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { Nullable } from '@echo/utils/types/nullable'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - listing-post - addListingPost', () => {
  let listingPostId: Nullable<string>
  const guild: ListingPostDiscordGuild = { id: 'discordId', channelId: 'channelId' }
  beforeAll(async () => {
    await assertListingPosts()
  })
  afterAll(async () => {
    await assertListingPosts()
  })
  beforeEach(() => {
    listingPostId = undefined
  })
  afterEach(async () => {
    if (!isNil(listingPostId)) {
      try {
        await deleteListingPost(listingPostId)
      } catch (e) {
        throw Error(`error deleting listing post with id ${listingPostId}: ${errorMessage(e)}`)
      }
    }
  })

  it('throws if trying to add a post for a listing that does not exist', async () => {
    await expect(addListingPost('not-found', guild)).rejects.toBeDefined()
  })
  it('add a listing post', async () => {
    const listingId = LISTING_MOCK_ID
    const newDocument = await addListingPost(listingId, guild)
    listingPostId = newDocument.id
    expect(newDocument.data.listingId).toStrictEqual(listingId)
    expect(newDocument.data.guild).toStrictEqual(guild)
    const listingPost = (await getListingPost(listingId, guild.id))!
    expect(listingPost.listingId).toStrictEqual(listingId)
    expect(listingPost.guild).toStrictEqual(guild)
    expectDateNumberIsNow(listingPost.postedAt)
  })
})
