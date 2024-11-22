import { getListingPost } from '@echo/firestore/crud/listing-post/get-listing-post'
import { addListingPost } from '@echo/test/firestore/crud/listing-post/add-listing-post'
import { deleteListingPost } from '@echo/test/firestore/crud/listing-post/delete-listing-post'
import { listingDocumentMockId } from '@echo/test/firestore/mocks'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - listing-post - getListingPost', () => {
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

  it('returns undefined if the document does not exist', async () => {
    await expect(getListingPost({ listingId: 'not-found', guildId: 'not-found' })).resolves.toBeUndefined()
    listingPostId = await addListingPost(data)
    await expect(getListingPost({ listingId: data.listingId, guildId: 'not-found' })).resolves.toBeUndefined()
    await expect(getListingPost({ listingId: 'not-found', guildId: data.guild.id })).resolves.toBeUndefined()
  })
  it('returns the document found', async () => {
    listingPostId = await addListingPost(data)
    const document = await getListingPost({ listingId: data.listingId, guildId: data.guild.id })
    expect(document).toStrictEqual(data)
  })
})
