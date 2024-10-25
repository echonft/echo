import { addListingPost } from '@echo/firestore/crud/listing-post/add-listing-post'
import { getListingPost } from '@echo/firestore/crud/listing-post/get-listing-post'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import { deleteListingPost } from '@echo/test/firestore/crud/listing-post/delete-listing-post'
import { listingDocumentMockId } from '@echo/test/firestore/initialize-db'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil } from 'ramda'

describe('CRUD - listing-post - addListingPost', () => {
  let listingPostId: Nullable<string>
  const data = { listingId: listingDocumentMockId, guild: { id: 'discordId', channelId: 'channelId' } }

  beforeEach(() => {
    listingPostId = undefined
  })
  afterEach(async () => {
    if (!isNil(listingPostId)) {
      await deleteListingPost(listingPostId)
    }
  })

  it('throws if the listing does not exist', async () => {
    await expect(addListingPost(assoc('listingId', 'not-found', data))).rejects.toEqual(Error(ListingError.NotFound))
  })

  it('throws if the listing post already exists', async () => {
    const { id } = await addListingPost(data)
    listingPostId = id
    await expect(addListingPost(data)).rejects.toEqual(Error(ListingError.PostExists))
  })

  it('add a listing post', async () => {
    const { id } = await addListingPost(data)
    listingPostId = id
    const listingPost = await getListingPost({ listingId: data.listingId, guildId: data.guild.id })
    expect(listingPost).toStrictEqual(data)
  })
})
