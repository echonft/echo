import { addListingPost } from '@echo/firestore/crud/listing-post/add-listing-post'
import { getListingPost } from '@echo/firestore/crud/listing-post/get-listing-post'
import type { ListingPostDiscordGuild } from '@echo/firestore/types/model/listing-post/listing-post'
import { assertListingPosts } from '@echo/firestore-test/listing-post/assert-listing-posts'
import { deleteListingPost } from '@echo/firestore-test/listing-post/delete-listing-post'
import { listingMockId } from '@echo/model-mocks/listing/listing-mock'
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

  it('add a listing post', async () => {
    const listingId = listingMockId()
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
