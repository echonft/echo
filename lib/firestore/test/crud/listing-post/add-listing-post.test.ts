import { addListingPost } from '@echo/firestore/crud/listing-post/add-listing-post'
import { deleteListingPost } from '@echo/firestore/crud/listing-post/delete-listing-post'
import { getListingPost } from '@echo/firestore/crud/listing-post/get-listing-post'
import type { ListingPostDiscordGuild } from '@echo/firestore/types/model/listing-post/listing-post'
import { assertListingPosts } from '@echo/firestore/utils/listing-post/assert-listing-posts'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
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
      await deleteListingPost(listingPostId)
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
    expect(dayjs.unix(listingPost.postedAt).isAfter(dayjs().subtract(1, 'minute'))).toBeTruthy()
    expect(dayjs.unix(listingPost.postedAt).isBefore(dayjs().add(1, 'minute'))).toBeTruthy()
  })
})
