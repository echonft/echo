import { getListingPost } from '@echo/firestore/crud/listing-post/get-listing-post'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing-post - getListingPost', () => {
  it('returns undefined if the document does not exist', async () => {
    const document = await getListingPost('not-found', 'not-found')
    expect(document).toBeUndefined()
  })
  it('returns the document found', async () => {
    const listingId = 'jUzMtPGKM62mMhEcmbN4'
    const guildId = '1'
    const document = await getListingPost(listingId, guildId)
    expect(document!.listingId).toStrictEqual(listingId)
    expect(document!.guild.id).toStrictEqual('1')
    expect(document!.guild.channelId).toStrictEqual('1')
  })
})
